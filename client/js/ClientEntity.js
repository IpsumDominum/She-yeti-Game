//confirmPack = {};
//confirmPack['bullets'] = {};
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
function drawArrowhead(context, from, to, radius) {
	var x_center = to.x;
	var y_center = to.y;

	var angle;
	var x;
	var y;
	context.beginPath();

	angle = Math.atan2(to.y - from.y, to.x - from.x)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.moveTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius *Math.cos(angle) + x_center;
	y = radius *Math.sin(angle) + y_center;

	context.lineTo(x, y);

	context.closePath();

	context.fill();
}
Player = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.spdX = 0;
    self.spdY = 0;
    self.hp = initPack.hp;
    self.hpMax = initPack.hpMax;
    self.score = initPack.score;
    self.username = initPack.username;
    Player.list[self.id] = self;
    self.map = initPack.map;
    self.draw = function(){
        if(self.map!==Player.list[selfId].map)
              return;
        
        
        /*
        if(self.id===selfId){
                        
        for(var img in map_items){
            var top = parseInt(map_items[img].top);
            var w = parseInt(map_items[img].width);
            var h = parseInt(map_items[img].height);
            var left = parseInt(map_items[img].left);
            var newx = Player.list[selfId].x+self.spdX;
            var newy = Player.list[selfId].y+self.spdY;
            if(newx+width/4>left && newx-width/4<left+w
            && newy>top && newy+height/4<top+h){
                newx = Player.list[selfId].x;
                newy = Player.list[selfId].y;            
                break;        
            }
            }
        if(newx-width/4<0 ||newx>Img.map[self.map].width-width/4)
            newx = Player.list[selfId].x;
        if(newy-width/4<0 ||newy>Img.map[self.map].height-height/4)
            newy = Player.list[selfId].y;
        confirmPack['id'] = selfId;
        confirmPack['x'] = newx;
        confirmPack['y'] = newy;
        self.x = newx;
        self.y = newy;
        }
        */
        var width = Img.player.width*2;
        var height = Img.player.height*2;
        var x = self.x -Player.list[selfId].x + WIDTH/2;
        var y = self.y - Player.list[selfId].y +HEIGHT/2;
        ctx.fillStyle = 'red';
        var hpWidth = 30 * self.hp/self.hpMax;
        
        var spdX = Math.cos(self.mouseAngle/180*Math.PI) * 40;
        var spdY = Math.sin(self.mouseAngle/180*Math.PI) * 40;
        //player rectangle is     aw    
        
        ctx.drawImage(Img.player,0,0,Img.player.width,Img.player.height,x-width/2,y-height/2,width,height);
        drawArrowhead(ctx,{x:x-width/2,y:y-height/2},{x:x+spdX,y:y+spdY},5);
        ctx.fillRect(x-hpWidth/2,y-40,hpWidth,4);
        ctx.fillStyle = 'black';
        var name = self.username.toString().slice(0,7);
        ctx.fillText(name,x-width/2,y+40,width,2);
//          ctx.fillText("hi",self.x,self.y);
//          ctx.fillText(self.score,self.x,self.y-60);
    }
    return self;
}
Player.list = {};
Bullet = function(initPack){
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.parent = initPack.parent;
    Bullet.list[self.id] = self;
    self.map = initPack.map;
    self.draw = function(){
        if(Player.list[selfId].map !== self.map)
          return;
        var width = Img.bullet.width/2;
        var height = Img.bullet.height/2;
        /*
        if(self.parent ===selfId){
            for(var img in map_items){
            var top = parseInt(map_items[img].top);
            var w = parseInt(map_items[img].width);
            var h = parseInt(map_items[img].height);
            var left = parseInt(map_items[img].left);
            var newx = self.x +self.spdX;
            var newy = self.y + self.spdY;
            if(newx+width/4>left && newx-width/4<left+w
            && newy-height>top && newy+height<top+h){
                confirmPack['bullets'][self.id] = {
                    x:self.x,
                    y:self.y,
                    toRemove:true,
                };
                return;
                } 
             }
             self.x = newx;
            self.y = newy;
        }
        confirmPack['bullets'][self.id] = {
                    x:self.x,
                    y:self.y,
        };
        */
        var x = self.x -Player.list[selfId].x + WIDTH/2;
        var y = self.y - Player.list[selfId].y +HEIGHT/2;
        if(suhaibmode && self.parent===selfId){
            var cha = (Math.floor(Math.random()*255)+1536).toString(16).toUpperCase();
            ctx.fillText(eval("'\\u0"+ cha+"'"),x-width/2,y-height/2);
        }
        else{
            ctx.drawImage(Img.bullet,0,0,Img.bullet.width,Img.bullet.height,x-width/2,y-height/2,width,height);
        }
//         ctx.fillRect(self.x-5,self.y-5,10,10);
    }
    return self;
}
Bullet.list = {};