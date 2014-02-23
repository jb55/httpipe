var express = require('express');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('cmdout');
var path = require('path');
var join = path.join;
var fs = require('fs');

var port = process.env.PORT || 8899;
var app = express();

var events = new EventEmitter();
app.active = {};

function readStream(id, done){
  var current = app.active[id];

  if (current) {
    debug("found active %s", id);
    return done(null, current);
  }

  var post = 'post ' + id;
  var postListen = function (stream){
    events.removeListener(post, postListen);
    return done(null, stream);
  };

  events.on(post, postListen);
}

app.get('/favicon.ico', function(req, res){
  res.send(404);
});

var route = /^\/(.*)/;

app.post(route, function(writer, res){
  var id = writer.params[0];
  if (app.active[id]) return res.send(409, "Something is already streaming here\n");
  if (id == "") return res.send(403, "Can't send here\n");
  events.emit('post ' + id, writer);
  app.active[id] = writer;
  
  function cleanup() {
    delete app.active[id];
  }

  writer.on('end', function(){
    debug("end writer %s", id);
    cleanup();
    res.send(200);
  });
  writer.on('close', function(){
    debug("close writer %s", id);
    cleanup();
  });
  writer.on('error', function(){
    debug("error writer %s", id);
    cleanup();
  });
  writer.on('finish', function(){
    debug("finish writer %s", id);
    cleanup();
  });

});

app.get(route, function(req, res){
  var id = req.params[0];
  if (id == null) return res.send(200, "Nothing to see here");

  debug("id %s", id);
  res.type(req.query.t || path.extname(id) || "application/octet-stream");
  res.writeHead(200);

  readStream(id, function(err, writer){
    writer.on('end', function(){
      debug("ending readStream");
      res.end();
    });
    writer.on('close', function(){
      debug("close readStream");
      res.end();
    });
    writer.on('error', function(){
      debug("error readStream");
      res.end();
    });
    writer.pipe(res);
  });
});

app.listen(port);
console.log("httpipe.io listening on port " + port);
