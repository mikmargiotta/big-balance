/*======================================
=            BUBBLES OBJECT            =
======================================*/
function Bubble(x,y,diametro,colore,nome,massimo){
	this.massimo = massimo*2;
	this.x = x;
	this.y = y;
	this.d = map(diametro,-20,this.massimo,0,height);
	this.r = this.d/2;
	
	this.coloreFill = color(colore,50,80,80);
	this.coloreStroke = color(colore,50,60,80);
	this.testo = diametro;

	//easing
	var duration = 1000/60; //60fps
	var value = 0;
	var fattore = 1.2;
	var target = this.d;
	var over = target * fattore;
	var easing = 0.05;
	  
	var inc = setInterval(exec, duration);
	var dec;

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

	this.display = function(){
		strokeWeight(2);
		stroke(this.coloreStroke);
		fill(this.coloreFill);
		ellipse(this.x, this.y, value, value);
	}
	this.colore = function(){
	    this.coloreFill = color(colore,50,80,80);
		this.coloreStroke = color(colore,50,60,80);
		noStroke();
		textFont('Bitter');
		textSize(48);
		textAlign(RIGHT);
		fill(this.coloreFill);
		text(this.testo, width, height-40);
  	}
	this.grigio = function(){
	    this.coloreFill = color(colore,0,70,80);
		this.coloreStroke = color(colore,0,50,80);
	}
 	this.base = function(){
	    this.coloreFill = color(colore,50,80,80);
		this.coloreStroke = color(colore,50,60,80);
 	} 
}
function Bubble2(x1,y1,diametro,diametro2,colore,nome,massimo){
	this.massimo = massimo*2;
	this.x1 = x1;
	this.y1 = y1;

	this.r1 = diametro;
	this.d2 = map(diametro2,-20,this.massimo,0,height);
	this.r2 = this.d2/2;
	this.agg = random(-2,10);
	this.angolo = random(-PI,PI);
	this.fuori = this.r1 + this.agg+ this.r2;

	this.x2 = this.fuori * cos(this.angolo); 
	this.y2 = this.fuori * sin(this.angolo);

	this.coloreFill = color(colore,50,80,80);
	this.coloreStroke = color(colore,50,60,80);
	this.testo = diametro2;

	//easing
	var duration = 1000/60; //60fps
	var value = 0;
	var fattore = 1.2;
	var target = this.d2;
	var over = target * fattore;
	var easing = 0.05;
	  
	var inc = setInterval(exec, duration);
	var dec;

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

	this.display = function(){
		strokeWeight(2);
		stroke(this.coloreStroke);
		fill(this.coloreFill);
		ellipse(this.x1+this.x2, this.y1+this.y2, value, value);
	}
	this.colore = function(){
	    this.coloreFill = color(colore,50,80,80);
		this.coloreStroke = color(colore,50,60,80);
		noStroke();
		textFont('Bitter');
		textSize(48);
		textAlign(RIGHT);
		fill(this.coloreFill);
		text(this.testo, width, height-40);
  	}
	this.grigio = function(){
	    this.coloreFill = color(colore,0,70,80);
		this.coloreStroke = color(colore,0,50,80);
	}
 	this.base = function(){
	    this.coloreFill = color(colore,50,80,80);
		this.coloreStroke = color(colore,50,60,80);
 	} 
}