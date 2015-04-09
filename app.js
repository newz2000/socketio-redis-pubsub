var express = require('express');
var redis = require('redis');
var init = require('./init');

var routes = require('./routes/index');

var client = redis.createClient();
var client2 = redis.createClient();
// client.auth(YOUR_PASSWORD);

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

init.createApp(app);

app.use('/', routes);

init.enableErrorHandlers(app);

// REDIS queue
client.publish('instances', 'start');

client2.on('message', function (channel, message) { 
 
    if ((channel == 'instances') && (message == 'start')) 
      console.log('New instance started!'); 
    else if ((channel == 'instances') && (message == 'stop')) 
      console.log('Instance stopped!');
    else if (channel == 'chat') {
      console.log('Received chat message:'+message);
      io.emit('chat message', message);
    }
 
});

client2.subscribe('instances');
client2.subscribe('chat');

process.on('SIGTERM', function () { 
    client.publish('instances', 'stop'); 
    process.exit(); 
});

// socket.io
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    client.publish('chat', msg);
    console.log('Received chat message:'+msg);
  });
});

var port = process.env.PORT || '3000';
http.listen(port, function(){
  console.log('listening on *:'+port);
});

module.exports.app = app;
module.exports.server = http;
