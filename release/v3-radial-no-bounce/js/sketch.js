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
			var a = new Bubble(random(width), height/2,elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
		}else{
			var a = new Bubble(random(width), height/2,elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
		}
	  bubbles.push(a);
	  i++;
	  if(bubbles.length == elementi.length){
	    clearInterval(stepbystep);
	  }
	}

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
	      var a = new Bubble(width/2,height/2, elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
	    }else{
	      var a = new Bubble2(width/2,height/2, bubbles[0].r, elementi[i].totale,elementi[i].colore,elementi[i].nome, massimo);
	    }
	  bubbles.push(a);
	  i++;
	  if(bubbles.length == elementi.length){
	    clearInterval(stepbystep);
	  }
	}

	function Bubble(x,y,diametro,colore,nome,massimo){
		this.massimo = massimo*2;
		this.x = x;
		this.y = y;
		this.d = map(diametro,-20,this.massimo,0,height);
		this.r = this.d/2;
		
		this.coloreFill = color(colore,50,80,80);
		this.coloreStroke = color(colore,50,60,80);
		this.testo = diametro;

		this.display = function(){
			strokeWeight(2);
			stroke(this.coloreStroke);
			fill(this.coloreFill);
			ellipse(this.x, this.y, this.r*2, this.r*2);
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

		

		this.display = function(){
			strokeWeight(2);
			stroke(this.coloreStroke);
			fill(this.coloreFill);
			ellipse(this.x1+this.x2, this.y1+this.y2, this.r2*2, this.r2*2);
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

