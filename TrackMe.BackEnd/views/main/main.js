/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


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

function showPosition(position) {
  	var coords = {  lat: position.coords.latitude, 
		lng: position.coords.longitude
			   }

	httpPostAsync( '/user/position', [["lat", coords.lat], ["lng", coords.lng], ["session", getSession()]], null, function(reply){
		console.log(reply);
		if(reply == 'error'){
			warning('Log in failed');
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
  

window.setInterval(getLocation, 1000);