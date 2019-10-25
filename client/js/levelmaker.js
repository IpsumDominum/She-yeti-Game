var toMenu = function(){
    alert('hi');
}
var WIDTH = 800;
var HEIGHT = 800;
var socket = io();
var choice = "";
var map_create_button = document.getElementById('map-create');
var map_name = document.getElementById('map-name');
var menu = document.getElementById("menu");
var info = document.getElementById("info");
var green = document.getElementById('green');
var blood = document.getElementById('blood');
var white =document.getElementById('white');

var enemy_box = document.getElementById('enemy-box-container');
var obj_box = document.getElementById('object-box-container');
var ctxbase = document.getElementById('ctx');
var ctx = ctxbase.getContext("2d");
green.onclick = function(){
    green.style.opacity = 1;
    blood.style.opacity = 0.3;
    white.style.opacity = 0.3;
    green.style.border = "10px solid orange";
    white.style.border = "0px solid orange";
    blood.style.border = "0px solid orange";
    choice = "green";
}
blood.onclick = function(){
    green.style.opacity = 0.3;
    blood.style.opacity = 1;
    white.style.opacity = 0.3;
    green.style.border = "0px solid orange";
    white.style.border = "0px solid orange";
    blood.style.border = "10px solid orange";
    choice = "blood";
}
white.onclick = function(){
    green.style.opacity = 0.3;
    blood.style.opacity = 0.3;
    white.style.opacity = 1;
    green.style.border = "0px solid orange";
    white.style.border = "10px solid orange";
    blood.style.border = "0px solid orange";
    choice = "white";
}
var random_name = ["Brendan MacCane","Michael Albert","Iain Hewson","Suhaib","Barnabas","Harlene Hane","The Joker","OUSA","Owheo","Big O"];
var random_adjective= ["Nuclear","Massive","tiny","Fat","Gorgeous","Super Long","Complicated","Secret","Hidden","Green","Blue","Black","AI","Arabic"];
var random_location = ["Toilet","Play room","Dungeon","Restaurant","Playground","Thing","Something","Hilbert Space","Vector Space","Factory","Slaughter room"];
var map_imgs = {
    "green":"map.png",
    "blood":"map2.png",
    "white":"map3.png",
}
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }
var timer =0;
map_name.value = choose(random_name) +"'s " +choose(random_adjective) +" " +choose(random_location);
map_create_button.onclick = function(){
    if(choice===""){
        window.requestAnimationFrame(step);
        info.style.color = "orange";
        info.style.opacity = 1;
        info.innerHTML = "Please choose a map first!";
    }else if(map_name.value===""){
        window.requestAnimationFrame(step);
        info.style.color = "orange";
        info.style.opacity = 1;
        info.innerHTML = "Please give the map a name!";
    }else{
        chosenMap = true;
        menu.style.display = 'none';
        var img = new Image();
        console.log(map_imgs[choice]);
        img.src = "/client/img/"+map_imgs[choice];
        img.onload = function(){
        var x = WIDTH/2 - img.width/2;
        var y = HEIGHT/2 - img.height/2;
        ctx.drawImage(img,x,y);
        }
        socket.emit('map_create',{map_name:map_name.value,map_choice:choice}); 
    }
}
function step(){
    if(timer===100){
        timer = 0;
        return;
    }else{
        timer +=1;
        info.style.opacity = 1-timer/100;
        window.requestAnimationFrame(step);
    }
  }
var chosenMap = false;
var switchTab = function(tab){
        switch(tab){
            case 1:  enemy_box.style.display='none';
                    obj_box.style.display="inline-block";
                     break;
                
            case 2:   enemy_box.style.display='inline-block';
                        obj_box.style.display="none";
                     break;
        }
}

var offset = 0;
function dragstart_handler(ev) {
    if(!chosenMap){
        return;
    }
    console.log("dragStart");
    // Set the drag's format and data. Use the event target's id for the data 
    
    // Create an image and use it for the drag image
    // NOTE: change "example.gif" to an existing image or the image will not
    // be created and the default drag image will be used.
    if(ev.target.nodeName=="IMG"){
        var src = 'client/img/'+ev.target.parentNode.id;
    }else{
        var src = 'client/img/'+ev.target.id;       
    }
    ev.dataTransfer.setData("source",src);
    var img = new Image();  
    img.src = src; 
    ev.dataTransfer.setDragImage(img,img.width/3,img.height/3);
   }
   
   function dragover_handler(ev) {
    if(!chosenMap){
        return;
    }
    ev.preventDefault();
   }
   
   function drop_handler(ev) {
    if(!chosenMap){
        return;
    }
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the drop target
    
    var rect = ctxbase.getBoundingClientRect();
    var img = new Image();
    var src = ev.dataTransfer.getData('source');
    img.onload = function(){
        var locx = ev.clientX-rect.left-img.width/2;
        var locy = ev.clientY-rect.top-img.height/2;
        //socket.emit('addImage',{'x':locx,'y':locy});
        if(src==="client/img/capguy.png"){
            var cropx = img.width/3;
            var cropy = img.height/4;
            ctx.drawImage(img,0,0,cropx,cropy,locx,locy,cropx,cropy);
        }
        else{
            ctx.drawImage(img,ev.clientX-rect.left-img.width/2,ev.clientY-rect.top-img.height/2);
        }
    };
    img.src = src;

    
    //ctx.drawImage(img,ev.clientX-rect.left-img.width/2,ev.clientY-rect.top-img.height/2);
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
   }

