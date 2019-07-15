/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var host = window.location.origin;


function httpGetAsync( uri, callback ){
    httpCall( uri, 'GET', null, callback );
}


function httpPostAsync( uri, headers, body, callback ){
    httpCall( uri, 'POST', headers, body, callback );
}


function httpCall( uri, method, headers, body, callback ){
    var http = new XMLHttpRequest();
    var url = host + "" + uri
    http.open(method, url, true); // true for asynchronous 
    http.setRequestHeader('Content-Type', 'application/json');
    headers.forEach(header => {
        http.setRequestHeader(header[0], header[1]);
    });
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    if( body == null ){
        http.send("");
    } else {
        http.send(JSON.stringify(body));
    }
}