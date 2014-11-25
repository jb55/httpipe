var parse = require('url').parse;
var join = require('path').join;
var remote = process.env.HTTPIPE_URL || "http://httpipe.io";

module.exports = function(url) {
  var parsed = parse(url);
  if (!parsed.hostname) url = remote + join('/', parsed.path);
  return url;
};

module.exports.url = remote;
