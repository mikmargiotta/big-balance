	/*============================
	=            BASE            =
	============================*/
	//Converte data
	function getDataConverted(data){
		var date = new Date(data);
		return date.getDate() +"/" + (date.getMonth()+1)+ "/" + date.getFullYear();
	}

	//Informazioni base
	function infoBase(){
		//Nome e cognome
		$('#name').text(base[0].nome +' '+base[0].cognome);
		//Date
		var nato;
		if(base[0].genere == 'male'){
			nato = "nato";
		}else{
			nato = "nata";
		}
		var date = calcola.converti(base[0].nascita);
		var diffDate = calcola.diffGiorni(base[0].nascita);
		var diffAnni = calcola.diffAnni(base[0].nascita);
		var day;
		if(diffDate == 1){
			day = ' giorno';
		}else{
			day = ' giorni';
		}
		$('#eta').html('Sei '+ nato +' il <span>'+ date +'</span>, hai '+ diffAnni +' anni e compierai il prossimo compleanno tra '+diffDate+day+'.<br>Provieni da <span>'+base[0].citta+'</span>.');
		//Web
		if('website' in base[0]){
			$('#web').html('La tua email è <span>'+base[0].email+'</span> e il tuo sito web è <span>'+base[0].website+'</span>.');
		}else{
			$('#web').html('La tua email è <span>'+base[0].email+'</span>.');
		}
		//FB id
		$('#fb-id').html('Il tuo id facebook è <span>'+base[0].id+'</span>.');

		//Conteggio totale
		$('#totale').html('Ipotizzando che un 1 contenuto sia uguale a 1 $.<br>Facebook ha guadagnato <span>'+totElementi()+'$</span>.');

	}

	var calcola = {
		//Converte in G/M/YYYY
		converti: function(data){
			var date = new Date(data);
			return date.getDate() +"/" + (date.getMonth()+1)+ "/" + date.getFullYear();
		},
		//Differenza due date giorni
		diffGiorni: function(data){
			var tmpDate = new Date(data);
			var date1 = new Date((tmpDate.getMonth()+1)+"/"+tmpDate.getDate()+"/2016");
			var today = new Date();
			var timeDiff = Math.abs(today.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			if(today < date1){
				return diffDays;
			}else{
				return 365-diffDays;
			}
		},
		//Differenza anni
		diffAnni: function(data){
			var tmpDate = new Date(data);
			var date1 = new Date((tmpDate.getMonth()+1)+"/"+tmpDate.getDate()+"/2016");
			var today = new Date();
			var diffYears = Math.abs(today.getFullYear() - tmpDate.getFullYear());
			if(today < date1){
				return diffYears-1;
			}else{
				return diffYears;
			}		
		}
	}

	/*================================
	=            ELEMENTI            =
	================================*/
	//Get Next Data
	function nextData(next, nome){
	if(next.data.length != 0){
	  //console.log(next);
	  if(nome in count) {
	    count[nome].push(next);
	  }
	  else {
	    count[nome] = new Array(next);
	  }
	  if(next.paging.next != undefined){
	    $.get(next.paging.next, function(data) {
	      nextData(data, nome); 
	    });
	  }else{
	    //console.log('finito next '+nome);
	    
	  }
	}else{
	  //console.log('finito '+nome);
	  //console.log(count);
	  //caricati.push(nome);
	  if(nome === 'post'){
	    lc();
	  }
	}
	}

	//Conteggio
	function conta(key){
	var numero = 0;
	for (var i = 0; i < count[key].length; i++){
	  numero += count[key][i].data.length;
	  //console.log(count[key][i].data.length);
	  if(i == count[key].length-1){
	    return numero;
	  }
	}
	}

	//Riordina gli elementi
	function riordina(){
	for(var key in count) {
	  //console.log(key+ " "+ conta(key));
	  aggiungiElemento(conta(key), key)
	}
	}

	//Aggiugi elemento
	function aggiungiElemento(tmpTotale, tmpTipo){
	var tmp = {totale: tmpTotale, tipo: tmpTipo};
	elementi.push(tmp);
	}

	//Totale contenuti
	function totElementi(){
	var numero = 0;
	for (var i = 0; i < elementi.length; i++){
	  numero += elementi[i].totale;
	  //console.log(elementi[i]);
	  if(i == elementi.length-1){
	    return numero;
	  }
	}
	}

	//Mi piace e commenti
	function lc(){
	for (var i = 0; i < count.post.length; i++) {
	  tot += count.post[i].data.length;
	  for (var j = 0; j < count.post[i].data.length; j++) {
	    postId = count.post[i].data[j].id;

	    //likes
	    FB.api(postId+"/likes?summary=true", function (likes) {
	      if(likes.data.length != 0){
	        totaleLikes += likes.summary.total_count;
	      }
	      call++;
	      if(tot == call){
	        //console.log('finito like');
	        aggiungiElemento(totaleLikes, 'likes');
	        caricati.push('likes');
	      }
	    });
	    //commenti
	    FB.api(postId+"/comments?summary=true", function (comments) {
	      if(comments.data.length != 0){
	        totaleComments += comments.summary.total_count;
	      }
	      call1++;
	      if(tot == call1){
	        //console.log('finito commenti');
	        aggiungiElemento(totaleComments, 'commenti');
	        caricati.push('commenti');
	      }
	    });
	  };
	};
	}