/*============================================
=            P5.JS SKETCH BUBBLES            =
============================================*/
	function setup(){
		var myCanvas = createCanvas(larghezzaCanvas, altezzaCanvas);
  		myCanvas.parent('canvas');
  		colorMode(HSB, 360, 100, 100, 100);
  		
	}
	function draw(){
		clear();
		for (var i = 0; i < bubbles.length; i++){
		    bubbles[i].display();
		    if(isHover){
			for (var j = 0; j < bubbles.length; j++){
			        if(j != indexHover){
			          bubbles[j].grigio();
			        }else{
			          bubbles[indexHover].colore();
			        }
			      }
			}else{
			    bubbles[i].base();
			}
		}
		
	}
	var i = 0;
	function intervallo(){
		if(i == 0){
			var a = new Bubble(width/2, height/2,elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
		}else{
			var a = new Bubble(random(width), random(height),elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
		}
	  bubbles.push(a);
	  i++;
	  if(bubbles.length == elementi.length){
	    clearInterval(stepbystep);
	  }
	}

	function Bubble(x,y,diametro,colore,nome,massimo){
		this.massimo = massimo*2;
		this.d = map(diametro,-30,this.massimo,0,height);
		this.r = this.d/2;
		this.x = constrain(x, this.r+2, width-(this.r+2));
		this.y = constrain(y, this.r+2+100, height-(this.r+2));
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
			ellipse(this.x, this.y, value,value);
			//console.log(this.d + " " +this.r);
		}
		this.colore = function(){
		    this.coloreFill = color(colore,50,80,80);
			this.coloreStroke = color(colore,50,60,80);
			noStroke();
			textFont('Bitter');
			textSize(48);
			textAlign(RIGHT);
			fill(this.coloreFill);
			text(this.testo, width-10, height-30);
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

