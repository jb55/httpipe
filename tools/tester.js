
var i = 0;

console.log("<pre>")

function echoer(){
  if (i++ % 2 == 0)
    console.log("ping");
  else
    console.log("pong");
}

process.on('SIGINT', function(){
  console.log("</pre>")
  process.exit(0);
});

setInterval(echoer, 500);
