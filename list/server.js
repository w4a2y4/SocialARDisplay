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

app.get('/1' , function(req, res){ res.sendFile(__dirname + '/client1.html'); });
app.get('/2' , function(req, res){ res.sendFile(__dirname + '/client2.html'); });
app.get('/3' , function(req, res){ res.sendFile(__dirname + '/client3.html'); });
app.get('/4' , function(req, res){ res.sendFile(__dirname + '/client4.html'); });
app.get('/5' , function(req, res){ res.sendFile(__dirname + '/client5.html'); });
app.get('/6' , function(req, res){ res.sendFile(__dirname + '/client6.html'); });
app.get('/7' , function(req, res){ res.sendFile(__dirname + '/client7.html'); });
app.get('/8' , function(req, res){ res.sendFile(__dirname + '/client8.html'); });
app.get('/9' , function(req, res){ res.sendFile(__dirname + '/client9.html'); });

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

    socket.on('start_s', function(dest, list){
        console.log('user '+user+' press start !');
        io.emit('start_c', dest, list);
    });

    socket.on('click_s', function(dest){
        console.log('user '+user+' click !');
        io.emit('click_c', dest);
    });

    socket.on('init', function(){
        console.log('initialize cnt');
    });

    socket.on('fade_word', function(i) {
        var t = new Date();
        var time = t.getHours()+':'+t.getMinutes()+':'+(t.getSeconds()+1)+':'+t.getMilliseconds();
        console.log( time+' word #'+i+' fade out.');
    });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});