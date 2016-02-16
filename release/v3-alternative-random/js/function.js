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

		//Capitalizzazione FB
		var diffAnni = calcola.diffAnni(base[0].nascita);
		$('#name').after('<div class="line mezzo"><h3>Capitalizzazione Fb</h3><h2>$ '+yahoo+'</h2></div>');

		//
		$('#name').after('<div class="line mezzo first"><h3>Se 1 contenuto = $1</h3><h2>$ '+totElementi()+'</h2></div>');
		//Età
		var diffAnni = calcola.diffAnni(base[0].nascita);
		$('#name').after('<div class="line mezzo"><h3>Hai</h3><h2>'+diffAnni+' anni</h2></div>');
		
		//Nascita
		var nato;
		if(base[0].genere == 'male'){
			nato = "nato";
		}else{
			nato = "nata";
		}
		var date = calcola.converti(base[0].nascita);
		$('#name').after('<div class="line mezzo first"><h3>Sei '+nato+' il</h3><h2>'+date+'</h2></div>');
		
		//City
		$('#name').after('<div class="line"><h3>Provieni da</h3><h2>'+base[0].citta+'</h2></div>');
		//Website
		if('website' in base[0]){
			var website = base[0].website;
			website = website.replace('http://', '');
			website = website.replace('/', '');
			$('#name').after('<div class="line"><h3>il tuo sito web</h3><h2>'+website+'</h2></div>');
		}
		//Email
		$('#name').after('<div class="line"><h3>la tua email</h3><h2>'+base[0].email+'</h2></div>');
		//FB id
		$('#name').after('<div class="line"><h3>IL TUO ID FACEBOOK</h3><h2>'+base[0].id+'</h2></div>');

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

	//1.1Conteggio
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

	//1.2Aggiugi elemento
	function aggiungiElemento(tmpTotale, tmpTipo){
		var tmp = {totale: tmpTotale, tipo: tmpTipo};
		elementi.push(tmp);
	}

	//2.Riordina gli elementi
	function riordina(){
		for(var key in count) {
		  //console.log(key+ " "+ conta(key));
		  aggiungiElemento(conta(key), key)
		}
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

	//Ordina da max a min
	var sortByProperty = function (property) {
	    return function (x, y) {
	        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
	    };
	};

	//Aggiungi colore e nome
	function aggiungiInfo(elementi){
			for (var i = 0; i < elementi.length; i++) {
				switch (elementi[i].tipo) {
					case "amici" :
						elementi[i].colore = 0;
						elementi[i].nome = 'Amici';
						break;
					case "likes" :
						elementi[i].colore = 90;
						elementi[i].nome = 'Mi piace';
						break;
					case "commenti" :
						elementi[i].colore = 45;
						elementi[i].nome = 'Commenti';
						break;
					case "film" :
						elementi[i].colore = 235;
						elementi[i].nome = 'Film';
						break;
					case "tv" :
						elementi[i].colore = 215;
						elementi[i].nome = 'Programmi Tv';
						break;
					case "video" :
						elementi[i].colore = 270;
						elementi[i].nome = 'Video';
						break;
					case "libri" :
						elementi[i].colore = 230;
						elementi[i].nome = 'Libri';
						break;
					case "pagine" :
						elementi[i].colore = 225;
						elementi[i].nome = 'Pagine piaciute';
						break;
					case "musica" :
						elementi[i].colore = 220;
						elementi[i].nome = 'Musica';
						break;
					case "albums" :
						elementi[i].colore = 0;
						elementi[i].nome = 'Albums';
						break;
					case "foto" :
						elementi[i].colore = 5;
						elementi[i].nome = 'Foto';
						break;
					case "post" :
						elementi[i].colore = 315;
						elementi[i].nome = 'Post';
						break;
				}
			};
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

	//Voci
	function aggiungiVoci(){
		for (var i = 0; i < elementi.length; i++) {
			$("<li>"+elementi[i].nome+"</li>").attr('data-index', i).appendTo("#voci");
		}
	}

