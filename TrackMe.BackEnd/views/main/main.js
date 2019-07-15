/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/

function warning(message){
    console.error(message);
    alert(message);
}


function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}


function getLocation() {
	console.log("update location")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

var map;
var marker;
var attempts = 0;

function showPosition(position) {
  	var coords = {  lat: position.coords.latitude, 
		lng: position.coords.longitude
			   }

	httpPostAsync( '/user/position', [["lat", coords.lat], ["lng", coords.lng], ["session", getSession()]], null, function(reply){
		if(reply == 'error'){
			attempts++;
			if(attempts > 10){
				warning('Session expired');
				attempts = 0;
				window.location.replace(window.location.origin + '/login');
				saveSession(null);
			}
		}
	});  

	map.setCenter(coords);
	marker = new google.maps.Marker({position: coords, map: map});
}


function initMap() {
    var position = {lat: -25.344, lng: 131.036};
    map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: position});
    var marker = new google.maps.Marker({position: position, map: map});
}
  

window.setInterval(getLocation, 2000);