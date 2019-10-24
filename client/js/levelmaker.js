
var side1 = document.getElementById("side1");
var side2 = document.getElementById("side2");
var side3 = document.getElementById("side3");
var side4 = document.getElementById("side4");
var test = document.getElementById("test");
var contentshaha = document.getElementById("menucontentshaha");
var backtrack = [];
var moving = false;
var nextId = 0;
var modeId = -1;
var images_added = {};
var mode = "idle";
function handler(e) {
e = e || window.event;

var pageX = e.pageX;
var pageY = e.pageY;
// IE 8
if (pageX === undefined) {
  pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
}
if(modeId !=-1){
if(mode=="center"){
  var elemen = document.getElementById(modeId);
  elemen.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  elemen.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('center',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('center',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('0',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('0',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('1',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('1',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('2',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('2',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('3',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('3',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('4',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('4',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('5',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('5',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('6',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('6',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");
  document.getElementById(''.concat('7',modeId)).parentElement.style.top = ''.concat(pageY- Math.round(elemen.height/2),"px");
  document.getElementById(''.concat('7',modeId)).parentElement.style.left = ''.concat(pageX-Math.round(elemen.width/2),"px");

}
}
}
function waitformousedown(e){
if (document.attachEvent) document.attachEvent('mousemove',handler);
else document.addEventListener('mousemove', handler);
}
function removemove(e){
if (document.attachEvent) document.detachEvent('mousemove',handler);
else document.removeEventListener('mousemove', handler);
}
function keyTrack(e){
var evtobj = window.event? event : e
if (evtobj.keyCode == 90 && evtobj.ctrlKey){
if (backtrack.length!=0){
//document.getElementById("canvas").innerHTML = backtrack.pop() ;
}
}
}
if (document.attachEvent) document.attachEvent('onmousedown',waitformousedown);
else document.addEventListener('mousedown', waitformousedown);
if (document.attachEvent) document.attachEvent('onmouseup',removemove);
else document.addEventListener('mouseup',removemove);

if (document.attachEvent) document.attachEvent('onkeydown',keyTrack);
else document.addEventListener('keydown', keyTrack);
// attach handler to the click event of the document

function changeItem(which) {
which = which.id
if(which=="side1"){
 contentshaha.innerHTML = ` <div class='col' width="400px"><ul class='list-unstyled'>
               <li class='media'>
                 <img class='mr-3' src='{{url_for('static',filename="images/wood.jpg")}}' alt='Generic placeholder image' width="200px">

                 <div class="col "><p class="text-light">Wood</p><button class="buttoncool" id="wood.jpg" onclick="chooseBackground(this)">Choose</button></div>
               </li>
              <div class="row"></div>
               <li class='media my-4'>
                 <img class='mr-3' src='{{url_for('static',filename="images/wood2.jpeg")}}' alt='Generic placeholder image' width="200px">
                 <div class="col"><p class="text-light">Brown Wood</p><button class="buttoncool" id="wood2.jpeg"onclick="chooseBackground(this)">Choose</button></div>
               </li>
               <div class="row"></div>
               <li class='media'>
                 <img class='mr-3' src='{{url_for('static',filename="images/yellow.jpg")}}' alt='Generic placeholder image' width="200px">
                 <div class='media-body'>
                     <div class="col"><p class="text-light">Yellow</p><button class="buttoncool" id="yellow.jpg"onclick="chooseBackground(this)">Choose</button></div>
                 </div>
               </li>                    
             </ul></div>
             `
 side1.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600'><i class='fas fa-link pr-0 md:pr-3 text-pink-500'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block'>Background</span></span>"
 side2.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Components</span></span>"
 side3.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Custom</span></span>"
 side4.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Templates</span></span>"
}else if(which=="side2"){
 contentshaha.innerHTML = `<h2 class="text-light">FEATURE UNDER CONSTRUCTION</h2>
             `
 side2.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600'><i class='fas fa-link pr-0 md:pr-3 text-pink-500'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block'>Components</span></span>"
 side1.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Background</span></span>"
 side3.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Custom</span></span>"
 side4.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Templates</span></span>"
}else if (which=="side3"){
 
 contentshaha.innerHTML = ` <div class='col' width="400px"><ul class='list-unstyled'>
               <li class='media'>
                  <img class='mr-3' src='{{url_for('static',filename="images/default-thumb.png")}}' alt='Generic placeholder image' width="200px">

                 <div class="col ">
                   
                    <form method="POST" action="" enctype="multipart/form-data">
  {{ form.hidden_tag() }}
  <fieldset class="form-group">
      <div class="form-group">
              <p class="text-light">{{ form.picture.label() }}</p>
              {{ form.picture(class="form-control-file") }}
              {% if form.picture.errors %}
                  {% for error in form.picture.errors %}
                      <span class="text-danger">{{ error }}</span></br>
                  {% endfor %}
              {% endif %}
          </div>
  </fieldset>
  <div class="form-group">
      {{ form.submit(class="btn btn-outline-info coolbutton") }}
  </div>
    </form>
               </li>           
               <div class="row"></div>
               <li class='media'>
               <button class="btn btn-light btn-sm btn-block" onclick="document.getElementById('id01').style.display='block'">My Resources</button>
               </li>
               
             </ul>
             <div id="id01" class="w3-modal">
<div class="w3-modal-content">
<div class="w3-main">
<h2> My Resources </h2>
<span onclick="document.getElementById('id01').style.display='none'"
class="w3-button w3-display-topright"><h5 class="text-black">Xclose</h5></span>
<div class="container">
<div class="row">
{% for img in store_uploaded_images %}
    {% if not (loop.index-page*6)>6 %}
      
    <div class="col-sm-4 py-2">
      <div class="card h-100 border-primary">
        <img class="card-img-top"src='{{url_for('static',filename="store_material/"+title+"/"+store_uploaded_images[img])}}' alt='Generic placeholder image' width="100px"' height='"100px"> ''               
          <div class="card-body">
              <a href="#" class="btn btn-outline-secondary" onclick="addImage('{{url_for('static',filename="store_material/"+title+"/"+store_uploaded_images[img])}}')">Add</a>
          </div>
      </div>
  </div>
    {% endif %}
{% endfor %}
{% for i in range(6-store_uploaded_images_length) %}
  <div class="col-sm-4 py-2">
      <div class="card h-100 border-light">
          <div class="card-body">
              
          
          </div>
      </div>
  </div>
{% endfor %}
</div>
</div>
{% for page_num in range(total_page_num) %}
  {% if page == page_num %}
    <a class="btn btn-info mb-4" href="{{ url_for('stores.store', store_name=title, mode='design',page=page_num) }}">{{ page_num }}</a>
  {% else %}
    <a class="btn btn-outline-info mb-4" href="{{ url_for('stores.store', store_name=title, mode='design', page=page_num) }}">{{ page_num }}</a>
  {% endif %}
{% endfor %}
</div>
</div>
</div>
</div>
</div>
             `
 side3.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600'><i class='fas fa-link pr-0 md:pr-3 text-pink-500'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block'>Custom</span></span>"
 side2.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Components</span></span>"
 side1.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Background</span></span>"
 side4.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Templates</span></span>"
}else if (which=="side4"){
 side4.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600'><i class='fas fa-link pr-0 md:pr-3 text-pink-500'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block'>Templates</span></span>"
 side2.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Components</span></span>"
 side3.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Custom</span></span>"
 side1.innerHTML = "<span class='block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500'><i class='fas fa-link pr-0 md:pr-3'></i><span class='pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block'>Background</span></span>"
}
}
function addImage(loadpath){
//backtrack.push(document.getElementById("canvas").innerHTML);
document.getElementById("canvas").innerHTML += ''.concat("<img src='",loadpath,"' alt='Generic placeholder image' style='position:absolute;top:500px;right:300px'","id='",nextId,"' >")
var thisW = document.getElementById(nextId).width;
var thisH = document.getElementById(nextId).height;
document.getElementById("canvas").innerHTML += ''.concat(`<svg width='200' height="200"> <circle cx="80" cy="80" r='`,Math.round(thisH/15),`' stroke='black' stroke-width="2" fill="transparent" /> </svg> `);

document.getElementById("canvas").innerHTML += ''.concat("<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",Math.round(thisW/15),"' cy='",Math.round(thisH/15),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='0",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat("<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",thisW - Math.round(thisW/15),"' cy='",Math.round(thisH/15),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white'id='1",nextId,"' /> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(                                                  
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",Math.round(thisW/15),"' cy='",thisH - Math.round(thisH/15),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='2",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(                                                  
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",thisW - Math.round(thisW/15),"' cy='",thisH - Math.round(thisH/15),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='3",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(                                                  
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",Math.round(thisH/27),"' cy='",Math.round(thisH/2),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='4",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(                                                  
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",Math.round(thisW/2),"' cy='",Math.round(thisH/27),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='5",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(                                                  
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",thisW-Math.round(thisH/27),"' cy='",Math.round(thisH/2),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='6",nextId,"'/> </svg>");
document.getElementById("canvas").innerHTML += ''.concat(
                                            "<svg width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px'>",
                                            "<circle cx='",Math.round(thisW/2),"' cy='",thisH-Math.round(thisH/27),"' r='",Math.round(thisH/30),"'stroke='black' stroke-width='2' fill='white' id='7",nextId,"'/> </svg>");
                                            document.getElementById("canvas").innerHTML += ''.concat(
                                            "<svg  width='",thisW,"' height='",thisH,"' style='position:absolute;top:500px;right:300px' >",
                                            "<circle cx='",Math.round(thisW/2),"' cy='",Math.round(thisH/2),"' r='",Math.round(thisH/2),"'stroke='grey' stroke-width='2' fill='transparent' id='center",nextId,"' /> </svg>");  

var new_image = {path:loadpath,id:nextId};
images_added[nextId] = new_image;
if(nextId !=0){
document.getElementById(''.concat('center',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('0',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('1',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('2',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('3',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('4',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('5',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('6',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('7',nextId-1)).style.fill= "transparent";
document.getElementById(''.concat('center',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('0',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('1',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('2',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('3',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('4',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('5',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('6',nextId-1)).style.stroke= "transparent";
document.getElementById(''.concat('7',nextId-1)).style.stroke= "transparent";
}
addClickHandler(document.getElementById(''.concat('center',nextId)),'center',new_image.id);
addClickHandler(document.getElementById(''.concat('1',nextId)),'1',new_image.id);
addClickHandler(document.getElementById(''.concat('2',nextId)),'2',new_image.id);
addClickHandler(document.getElementById(''.concat('3',nextId)),'3',new_image.id);
addClickHandler(document.getElementById(''.concat('4',nextId)),'4',new_image.id);
addClickHandler(document.getElementById(''.concat('5',nextId)),'5',new_image.id);
addClickHandler(document.getElementById(''.concat('6',nextId)),'6',new_image.id);
addClickHandler(document.getElementById(''.concat('7',nextId)),'7',new_image.id);                                              
nextId += 1; 
document.getElementById('test').innerHTML = nextId;

}  
function addClickHandler(elem, setmode,id) {
if (elem.attachEvent){
elem.attachEvent('onmousedown',function(e){
mode = setmode;     
modeId = id;
});
elem.attachEvent('onmouseup',function(e){
mode = "idle";     
modeId = -1; 
});
}else{
elem.addEventListener("mousedown", function(e) {
mode = setmode;     
modeId = id;
  // in the event handler function here, you can directly refer
  // to arg1 and arg2 from the parent function arguments
}, false);   
elem.addEventListener('mouseup', function(e) {
mode = "idle";     
modeId = -1;
  // in the event handler function here, you can directly refer
  // to arg1 and arg2 from the parent function arguments
},false);
}
}
function save_state(){
//this function is very important,it is triggered by the button of SAVE 
//We are going to store the content of a page as
// images + components (for now)
// The json file will be as follows
// images=
fetch('/save-state', {
// Specify the method
method: 'POST',

// A JSON payload
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
  "greeting": "Hello from the browser!"
})
}).then(function (response) { // At this point, Flask has printed our JSON
return response.text();
}).then(function (text) {

  document.getElementById('test').innerHTML = text;
});

}
function chooseBackground(back){
document.getElementById("cardbackground").style.backgroundImage = ''.concat("url('/static/images/",back.id,"')");

}
   /*Toggle dropdown list*/
   function toggleDD(myDropMenu) {
       document.getElementById(myDropMenu).classList.toggle("invisible");
   }
   /*Filter dropdown options*/
   function filterDD(myDropMenu, myDropMenuSearch) {
       var input, filter, ul, li, a, i;
       input = document.getElementById(myDropMenuSearch);
       filter = input.value.toUpperCase();
       div = document.getElementById(myDropMenu);
       a = div.getElementsByTagName("a");
       for (i = 0; i < a.length; i++) {
           if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
               a[i].style.display = "";
           } else {
               a[i].style.display = "none";
           }
       }
   }
   // Close the dropdown menu if the user clicks outside of it
   window.onclick = function(event) {
       if (!event.target.matches('.drop-button') && !event.target.matches('.drop-search')) {
           var dropdowns = document.getElementsByClassName("dropdownlist");
           for (var i = 0; i < dropdowns.length; i++) {
               var openDropdown = dropdowns[i];
               if (!openDropdown.classList.contains('invisible')) {
                   openDropdown.classList.add('invisible');
               }
           }
       }
   }
