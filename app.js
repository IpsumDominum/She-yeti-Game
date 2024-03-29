var mongojs = require("mongojs");
var db = mongojs('localhost:27017/ShittyGame',['account','progress']);

require('./Entity')
require('./mapStuff')
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/client/index.html');
});
app.get('/levelmaker',function(req,res){
    res.sendFile(__dirname + '/client/levelmaker.html');
});
app.use('/client',express.static(__dirname + '/client'));
serv.listen(process.env.PORT||2000);
console.log("started")



var DEBUG =true;


var isValidPassword = function(data,cb){
    db.account.find({username:data.username,password:data.password},function(err,res){
        if(res!=undefined &&res.length>0)
            cb(true);
        else
            cb(false);
    });
}
var isUsernameTaken = function(data,cb){
    db.account.find({username:data.username},function(err,res){
        if(res.length>0)
            cb(true);
        else
            cb(false);
    });
}
var addUser = function(data,cb){
    db.account.insert({username:data.username,password:data.password},function(err){
        cb();
    }); 
}
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	if(!DEBUG){
	socket.on('signIn',function(data){		
		isValidPassword(data,function(res){
			if(res){
				
				Player.onConnect(socket,data.username);
				socket.emit('signInResponse',{success:true});
			} else {
				socket.emit('signInResponse',{success:false});			
			}
		});
	});
	socket.on('signUp',function(data){
		
		isUsernameTaken(data,function(res){
			if(res){
				socket.emit('signUpResponse',{success:false});		
			} else {
				addUser(data,function(){
					socket.emit('signUpResponse',{success:true});					
				});
			}
		});		
    });
    }else{
        Player.onConnect(socket,socket.id);
        socket.emit('signInResponse',{success:true});        
    }
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
	
	
	socket.on('evalServer',function(data){
		if(!DEBUG)
			return;
		var res = eval(data);
		socket.emit('evalAnswer',res);		
	});
	socket.on('addImage',function(data){
		console.log('hi');
	});
	socket.on('map_create',function(data){
		console.log('hi');
	});
});


setInterval(function(){
    var packs = Entity.getFrameUpdateData();
	
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('init',packs.initPack);
		socket.emit('update',packs.updatePack);
		socket.emit('remove',packs.removePack);
	}

	
},1000/25);





