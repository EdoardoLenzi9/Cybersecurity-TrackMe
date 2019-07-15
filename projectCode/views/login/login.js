/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


function warning(message){
    alert(message);
}


function signIn(){
    var username = $('#signin-username')[0].value;
    var mail = $('#signin-mail')[0].value;
    var password = $('#signin-password')[0].value;
    var credentials = encodeCredentials(mail, password, username);
    httpPostAsync( '/user', [["Authorization", credentials]], null, function(reply){
        console.log(reply);
        if(reply != 'error'){
            saveSession(reply);
            window.location.replace(window.location.origin + '/check');
        } else {
            warning('Sign in failed');
        }
    });
}


function logIn(){
    var mail = $('#login-mail')[0].value;
    var password = $('#login-password')[0].value;
    var credentials = encodeCredentials(mail, password);
    httpPostAsync( '/user/login', [["Authorization", credentials]], null, function(reply){
        console.log(reply);
        if(reply != 'error'){
            saveSession(reply);
            window.location.replace(window.location.origin + '/main');
        } else {
            warning('Log in failed');
        }
    });
}


function encodeCredentials(mail, password, username = null){
    if (username == null){
        return "Basic " + btoa(mail + '{:}' + password);
    } else {
        return "Basic " + btoa(mail + '{:}' + password + '{:}' + username);
    }
}


var session = getSession();
if(session != null && session != "null"){
    window.location.replace(window.location.origin + '/main');
}