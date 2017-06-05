var express = require('express');
var port = 9487;
var path = require('path');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');

var filename;

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function finit() {
    var t = new Date().Format("yyyyMMdd-hhmm");
    filename = '../log/' + t;
    fs.writeFile(filename, "created @ " + t + '\n', function(err){
        if (err) {
          console.error(err)
        }
    });
}
finit();

function fwrite(data) {
    fs.appendFile( filename , data + '\n', function(err){
        if (err) { console.error(err) }
    });
}

var user_num=0;

app.use(express.static(path.join(__dirname, 'view')));
app.get('/1' , function(req, res){ res.sendFile(__dirname + '/clients/client1.html'); });
app.get('/2' , function(req, res){ res.sendFile(__dirname + '/clients/client2.html'); });
app.get('/3' , function(req, res){ res.sendFile(__dirname + '/clients/client3.html'); });
app.get('/4' , function(req, res){ res.sendFile(__dirname + '/clients/client4.html'); });
app.get('/5' , function(req, res){ res.sendFile(__dirname + '/clients/client5.html'); });
app.get('/6' , function(req, res){ res.sendFile(__dirname + '/clients/client6.html'); });
app.get('/7' , function(req, res){ res.sendFile(__dirname + '/clients/client7.html'); });
app.get('/8' , function(req, res){ res.sendFile(__dirname + '/clients/client8.html'); });
app.get('/9' , function(req, res){ res.sendFile(__dirname + '/clients/client9.html'); });
app.get('/server.html', function(req, res){ res.sendFile(__dirname + '/server.html');});

io.on('connection', function(socket){

    console.log('user '+ user_num + ' connected');
    var user = user_num++;

    socket.on('disconnect', function(){
        console.log('user '+user+' disconnectedQQ');
    });

    socket.on('start_s', function(dest, list){
        console.log('user '+user+' press start !');
        var t = new Date().Format("hh:mm:ss:S");
        console.log( t+' list fade in @client' + dest);
        fwrite( '\n' +t+' list fade in @client' + dest );
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
        var t = new Date().Format("hh:mm:ss:S");
        console.log( t+' word #'+i+' fade out.');
        fwrite( t+' word #'+i+' fade out.' );
    });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});

