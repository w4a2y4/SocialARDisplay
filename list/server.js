var express = require('express');
var port = 9487;
var path = require('path');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user_num=0;

app.use(express.static(path.join(__dirname, 'view')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/server.html', function(req, res){
  res.sendFile(__dirname + '/server.html');
});

io.on('connection', function(socket){

    console.log('user '+ user_num + ' connected');
    socket.emit('ID_res', user_num);
    var user = user_num++;

    socket.on('disconnect', function(){
        console.log('user '+user+' disconnectedQQ');
    });

    socket.on('start_s', function(dest){
        console.log('user '+user+' press start !');
        io.emit('start_c', dest);
    });

    socket.on('click_s', function(dest){
        console.log('user '+user+' click !');
        io.emit('click_c', dest);
    });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});