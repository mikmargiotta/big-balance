/*===============================
=            JS BASE            =
===============================*/

var base = new Array();
var caricati = new Array();
var ciclo;
var count = new Array();
var elementi = new Array();
var totaleLikes = 0;
var totaleComments = 0;
var call = 0;
var tot = 0;
var call1 = 0;
var yahoo;
var larghezzaCanvas;
var altezzaCanvas;
var stepbystep; // Caricaca bubbles stepbystep
var massimo; //Valore elementi max

var bubbles = [];
var indexHover = 0;
var isHover = false;

//FB API
window.fbAsyncInit = function() {
FB.init({
  appId      : '1519278631720519',
  xfbml      : true,
  version    : 'v2.5'
});
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {
	$('#loginbutton').click(function(event) {
		FB.login(function(response){
			if(response.status == 'connected'){
				ciclo = setInterval(verificaCaricamento, 1000);
				$('#loginbutton').fadeOut('slow', function() {
					$(this).text('Sto Prelevando i tuoi dati').fadeIn('slow');
				});
				
				//Informazioni base
				FB.api('/me', {fields: 'first_name, last_name, gender, birthday, hometown, email, website'}, function(data) {
				  base.push({
				  	id: data.id,
				  	nome: data.first_name,
				  	cognome: data.last_name,
				  	email: data.email,
				  });
				  if ('gender' in data) {base[0].genere= data.gender;}
				  if ('birthday' in data) {base[0].nascita= data.birthday;}
				  if ('hometown' in data) {base[0].citta= data.hometown.name;}
				  if ('email' in data) {base[0].email= data.email;}
				  if ('website' in data) {base[0].website= data.website;}
				  caricati.push('base');
				});

				//Get immagine di profilo
				FB.api('/me/picture?width=480', function(photo) {
					$('#photo-inner').css('background-image', 'url(' + photo.data.url + ')');
				 	caricati.push('profilo');
				});

		        //VIDEO
		        FB.api("me/videos?type=uploaded&tagged", function (videos) {
		          if (videos && !videos.error) {
		            nextData(videos, "video"); 
		          }else{
		            console.log("errore "+videos.error);
		          }
		        });

		        //PAGINE
		        FB.api("me/likes?limit=100", function (pagine) {
		          if (pagine && !pagine.error) {
		            nextData(pagine, "pagine"); 
		          }else{
		            console.log("errore "+pagine.error);
		          }
		        });

		        //PAGINE BOOKS
		        FB.api("me/books?limit=100", function (books) {
		          if (books && !books.error) {
		            nextData(books, "libri"); 
		          }else{
		            console.log("errore "+books.error);
		          }
		        });

		        //PAGINE MOVIES
		        FB.api("me/movies?limit=100", function (movies) {
		          if (movies && !movies.error) {
		            nextData(movies, "film"); 
		          }else{
		            console.log("errore "+movies.error);
		          }
		        });

		        //PAGINE MUSIC
		        FB.api("me/music?limit=100", function (music) {
		          if (music && !music.error) {
		            nextData(music, "musica"); 
		          }else{
		            console.log("errore "+music.error);
		          }
		        });

		        //PAGINE tv
		        FB.api("me/television?limit=100", function (tv) {
		          if (tv && !tv.error) {
		            nextData(tv, "tv"); 
		          }else{
		            console.log("errore "+tv.error);
		          }
		        });

		        //FRIENDS
		        FB.api("/me/friends", function (amici) {
		          if (amici && !amici.error) {
		            aggiungiElemento(amici.summary.total_count, 'amici');
		            //console.log('finito amici');
		          }else{
		            console.log("errore "+amici.error);
		          }
		        });

		        //ALBUMS
		        FB.api("me/albums", function (albums) {
					if (albums && !albums.error) {
						nextData(albums, "albums");
						//FOTO
						for (var i = 0; i < albums.data.length; i++) {
						  var albumId = albums.data[i].id;
						  FB.api(albumId+"/photos", function (photos) {
						    nextData(photos, "foto");
						  });
						};
					}else{
						console.log("errore "+albums.error);
					}
		        });

		        //Post
		        FB.api("me/feed?limit=100", function (posts) {
		          if (posts && !posts.error) {
		            nextData(posts, "post"); 
		          }else{
		            console.log("errore "+posts.error);
		          }
		        });

		        //Yahoo Finance
		        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22FB%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'
		        $.get(url, function(data) {
		        	yahoo = data.query.results.quote.MarketCapitalization;
		        });
			}else{
				alert('Errore');
			}
		}, {scope: 'user_about_me, user_birthday, email, user_hometown, user_website, user_videos, user_posts, user_photos, user_likes, user_friends'});
	});
	larghezzaCanvas = $('#canvas').width();
	altezzaCanvas = $('#canvas').height();
	$('#voci').on('mouseover', 'li', function(event) {
		isHover = true;
		indexHover = $(this).data("index");
	}).on('mouseout', 'li', function(event) {
		isHover = false;
	});
});

//Caricamento dati
function verificaCaricamento(){
	console.log(caricati.length);
	if(caricati.length == 4){
		//console.log(elementi);
		//console.log('fine caricamento dati');
		$('#loginbutton').fadeOut('slow', function() {
			$(this).text('Fatto!').fadeIn('slow');
		});
		riordina();
		aggiungiInfo(elementi);
		elementi= elementi.sort(sortByProperty('totale'));
		massimo = elementi[0].totale;
		//console.log(elementi);
		infoBase();
		aggiungiVoci();
		$('#login').removeClass('active').siblings().addClass('active');
		stepbystep = setInterval(intervallo, 1000);
		clearInterval(ciclo);
	}
}