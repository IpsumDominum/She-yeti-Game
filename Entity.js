SOCKET_LIST = {};
var initPack = {player:[],bullet:[]};
var removePack = {player:[],bullet:[]};
var bulletidx = 0;

Entity = function(param){
    var self= {
        x:250,
        y:250,
        spdX:0,
        spdY:0,
        id:"",
        map:'forest',
    }
    if(param){
		if(param.x)
			self.x = param.x;
		if(param.y)
			self.y = param.y;
		if(param.map)
			self.map = param.map;
		if(param.id)
			self.id = param.id;		
    }    
    self.update = function(){
        self.updatePosition();
    }
    self.updatePosition = function(){
        self.x += self.spdX;        
        self.y += self.spdY;        
    }
    self.getDistance = function(pt){
        return Math.sqrt(Math.pow(self.x-pt.x,2)+Math.pow(self.y-pt.y,2));
    }
    return self;
}
Entity.getFrameUpdateData = function(){
    var pack = {
        initPack:{
            player:initPack.player,
            bullet:initPack.bullet,
        },
        removePack:{
            player:removePack.player,
            bullet:removePack.bullet,
        },
        updatePack:{
            player:Player.update(),
            bullet:Bullet.update()
        }
    }
    initPack.player = [];
	initPack.bullet = [];
	removePack.player = [];
	removePack.bullet = [];
    return pack;

}
 Player = function(param){
    var self = Entity(param);   
    self.pressingDown = false;
    self.pressingLeft = false;
    self.pressingRight = false;
    self.pressingUp = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.hp = 10;
    self.attackSpd = 10;
    self.cooldown = 0;
    self.bullet = "magic";
    self.bulletspeed = 40;
    self.hpMax =10;
    self.username = param.username;
    self.score = 0;
    self.maxSpd = 10;
    var super_update = self.update;
    self.update = function(){
        self.updateSpd();
        super_update();
        if(self.pressingAttack){
            if(self.cooldown ===0){
                self.shootBullet(self.mouseAngle);
                self.cooldown = self.attackSpd;
            }
        }
        if(self.cooldown>0)
            self.cooldown -=1;
        
    }
    self.shootBullet = function(angle){
        Bullet({
			parent:self.id,
			angle:angle,
			x:self.x,
			y:self.y,
            map:self.map,
            bulletspeed:self.bulletspeed,
		});
    }
    self.updateSpd = function(){
        if(self.pressingRight)
            self.spdX = self.maxSpd;    
        else if(self.pressingLeft)
            self.spdX = -self.maxSpd;
        else
            self.spdX = 0;
        if(self.pressingUp)
            self.spdY = -self.maxSpd;
        else if(self.pressingDown)
            self.spdY = self.maxSpd;
        else
            self.spdY = 0;
    }
    self.getInitPack = function(){
        return{
            id:self.id,
            x:self.x,
            y:self.y,
            hp:self.hp,
            hpMax:self.hpMax,
            score:self.score,
            map:self.map,
            username:self.username
        };
    }
    self.getUpdatePack = function(){
        return{
            id:self.id,
            x:self.x,
            y:self.y,
            spdX:self.spdX,
            spdY:self.spdY,
            hp:self.hp,
            score:self.score,
            map:self.map,
            mouseAngle:self.mouseAngle
        }
    }
    Player.list[self.id] = self;
    initPack.player.push(self.getInitPack());
    return self;
}
Player.list =  {};
Player.onConnect = function(socket,username){    
    var map = 'forest';
	if(Math.random() < 0.5)
		map = 'field';
	var player = Player({
        username:username,
		id:socket.id,
        map:map,
	});
    socket.on('keyPress',function(data){
        if(data.inputId=='left')
            player.pressingLeft = data.state;
        if(data.inputId=='right')
            player.pressingRight = data.state;
        if(data.inputId=='up')
            player.pressingUp = data.state;
        if(data.inputId=='down')
            player.pressingDown = data.state;
        if(data.inputId=='attack')
            player.pressingAttack = data.state;
        if(data.inputId=='mouseAngle')
            player.mouseAngle = data.state;
    });
    
        socket.emit('init',{
            selfId:socket.id,
            player:Player.getAllInitPack(),
            bullet:Bullet.getAllInitPack(),
        })
        /*
        socket.on('confirm',function(data){
            Player.list[data['id']].x = data['x'];
            Player.list[data['id']].y = data['y'];
            for(var b in data['bullets']){
                if(Bullet.list[b]!=undefined){
                Bullet.list[b].x = data['bullets'][b]['x'];
                Bullet.list[b].y = data['bullets'][b]['y'];
                if(data['bullets'][b]['toRemove'])
                Bullet.list[b].toRemove = data['bullets'][b]['toRemove'];
                }
            }
        });*/
        socket.on('changeMap',function(data){
            if(player.map ==="field")
            player.map = "forest";
            else
            player.map = 'field';
        });
        socket.on('sendMsgToServer',function(data){
            var playerName = (" " + Player.list[socket.id].username);
            for(var i in SOCKET_LIST){
                SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
            }
        });

}
Player.getAllInitPack = function(){
    var players = [];
    for(var i in Player.list)      
        players.push(Player.list[i].getInitPack());
    return players;
}
Player.onDisconnect = function(socket){
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
}
Player.update = function(){
    var pack = [];
    for(var i in Player.list){
        var player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
}
Bullet = function(param){
    var self = Entity(param);
    self.id = bulletidx ++;
    self.parent = param.parent;
    self.bulletspeed = param.bulletspeed;
    self.spdX = Math.cos(param.angle/180*Math.PI) * self.bulletspeed;
    self.spdY = Math.sin(param.angle/180*Math.PI) * self.bulletspeed;
    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;
    self.update = function(){
        if(self.timer++ > 100)
            self.toRemove = true;
        super_update();
        for(var i in Player.list){
            var p = Player.list[i];
            if(self.map===p.map && self.getDistance(p)<32 && self.parent!==p.id){
                p.hp -=1;
                if(p.hp<=0){
                    var shooter = Player.list[self.parent];
                    if(shooter)
                        shooter.score +=1;
                    p.hp = p.hpMax;
                    p.x = Math.random() *500;
                    p.y = Math.random() *500;
                }
                self.toRemove = true;
            }
        }
    }
    self.getInitPack = function(){
        return{
            id:self.id,
            x:self.x,
            y:self.y,
            parent:self.parent,
            map:self.map,
        };
    }
    self.getUpdatePack = function(){
        return{
        id:self.id,
        x:self.x,
        y:self.y,
        spdX:self.spdX,
        spdY:self.spdY,
        };
    }
    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());
    return self;
}
Bullet.getAllInitPack = function(){
        var bullets = [];
        for(var i in Bullet.list)
            bullets.push(Bullet.list[i].getInitPack());
    return bullets;
}
Bullet.list = {};
Bullet.update = function(){
    var pack = [];
    for(var i in Bullet.list){
        var bullet = Bullet.list[i];
        bullet.update();
        if(bullet.toRemove){
            delete Bullet.list[i]
            removePack.bullet.push(bullet.id);
        }else{
            pack.push(bullet.getUpdatePack());
        }
    }
    return pack;
}