/*============================================
=            P5.JS SKETCH BUBBLES            =
============================================*/



	var bubbles = [];
	function setup(){
		var myCanvas = createCanvas(larghezzaCanvas, altezzaCanvas);
  		myCanvas.parent('canvas');
  		colorMode(HSB, 360, 100, 100, 100);
  		
	}
	function draw(){
			clear();
			for (var i = 0; i < bubbles.length; i++){
			    bubbles[i].display();
			    //bubbles[i].move();
			    if( bubbles[i].isHover()){
			      var a = bubbles.indexOf(bubbles[i]);
			      for (var j = 0; j < bubbles.length; j++){
			        if(j != a){
			          bubbles[j].grigio();
			        }else{
			          bubbles[a].colore();
			        }
			      }
			      
			      //console.log(a);
			    }else{
			      bubbles[i].base();
			    }
			}
		}

		var i = 0;
		function intervallo(){
		  var a = new Bubble(random(width), height/2,elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
		  bubbles.push(a);
		  i++;
		  if(bubbles.length == elementi.length){
		    clearInterval(stepbystep);
		  }
		}

		function Bubble(x,y,diametro,colore,nome,massimo){
			this.massimo = massimo/8;
			this.d = map(diametro,0,height,2,this.massimo);
			this.r = this.d/2;
			this.x = constrain(x, this.r+2, width-(this.r+2));
			this.y = y;
			this.coloreFill = color(colore,50,80,80);
			this.coloreStroke = color(colore,50,60,80);
			this.testo = nome + " " + diametro;

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
			this.isHover = function(){
		    	var d = dist(mouseX,mouseY, this.x, this.y);
		    	if(d < this.r){
		      		return true;
		    	}else{
		      		return false;
		    	}
		  	}

		}