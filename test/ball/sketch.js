var miks = [];
function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(255);
  for(var i = 0; i < miks.length; i++){
    miks[i].mostra();
  }
  //intervallo();
}
var mm = setInterval(intervallo, 1000);
function intervallo(){
  var x = random(width);
  var y = random(height);
  var diam = random(50,300);
  var a = new Obj(x, y, diam);
  miks.push(a);
  if(miks.length == 50){
    clearInterval(mm);
  }
}

//OBJ
function Obj(x, y, dim){
  var duration = 1000/60; //60fps
  var value = 0;
  var fattore = 1.5;
  var target = dim;
  var over = target * fattore;
  var easing = 0.05;
  
  var inc = setInterval(exec, duration);
  var dec;
  
  var c = random(255);
  
  function exec(){
    if(ceil(value) >= over){
      clearInterval(inc);
      dec = setInterval(decr, duration);
    }else{
      //value++;
      value += easing * (over - value);
    }
  }
  function decr(){
    if(ceil(value) <= target){
      clearInterval(dec);
    }else{
      value -= easing * (value -target);
    }
  }
  this.mostra = function(){
    //println(ceil(value));
    noStroke();
    fill(c, 125);
    ellipse(x,y,value,value);
  }
  }
    
