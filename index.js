var express = require('express');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('cmdout');
var path = require('path');
var join = path.join;
var fs = require('fs');

var port = process.env.PORT || 8899;
var app = express();

var events = new EventEmitter();
var active = {};

function readStream(id, done){
  var current = active[id];

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
  if (active[id]) return res.send(409, "Something is already streaming here\n");
  if (id == "") return res.send(403, "Can't send here\n");
  events.emit('post ' + id, writer);
  active[id] = writer;

  writer.on('end', function(){
    delete active[id];
    res.send(200);
  });
  writer.on('close', function(){
    delete active[id];
  });
  writer.on('error', function(){
    delete active[id];
  });

});

app.get(route, function(req, res){
  var id = req.params[0]
  if (id == null) return res.send(200, "Nothing to see here");

  debug("id %s", id);
  res.type(req.query.t || path.extname(id) || "application/octet-stream");
  res.writeHead(200);

  function cleanup(writer) {
    writer.unpipe();
    res.end();
  }

  readStream(id, function(err, writer){
    writer.on('end', function(){
      debug("ending readStream");
      cleanup(writer);
    });
    writer.on('close', function(){
      debug("close readStream");
      cleanup(writer);
    });
    writer.on('error', function(){
      debug("error readStream");
      cleanup(writer);
    });
    writer.pipe(res);
  });
});

app.listen(port);
console.log("httpipe.io listening on port " + port);
