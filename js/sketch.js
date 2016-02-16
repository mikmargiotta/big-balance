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
	
	//a = calcella s = riparti
	function keyTyped() {
	  if (key === 'a') {
	    bubbles = [];
	    i = 0;
	    clearInterval(stepbystep);
	  } else if (key === 's') {
	    stepbystep = setInterval(intervallo, 1000);
	  }
	  return false; 
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
	    //i = 0;
	  }
	}
