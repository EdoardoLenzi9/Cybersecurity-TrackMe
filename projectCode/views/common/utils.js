var save = function(key, value){
    localStorage.setItem(key, value);
} 


var get = function(key){
  	return localStorage.getItem(key);
} 


var getSession = function(){
    var session = get("session");
    //if(session == null && window.location.href != (window.location.origin + '/login/')){
    //  	window.location.replace(window.location.origin + '/login');
    //}
    return session;
}


var saveSession = function(session){
  	return save("session", session);
}
