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
