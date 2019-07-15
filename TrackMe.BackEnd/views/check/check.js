/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


function warning(message){
    alert(message);
}


function verifyCode(){
    var code = $('#code')[0].value;
    var session = getSession();
    httpPostAsync( '/user/verify', [["Code", code], ["Session", session]], null, function(reply){
        console.log(reply);
        if(reply != 'error'){
            window.location.replace(window.location.origin + '/main');
        } else {
            warning('Sign in failed');
        }
    });
}


function logIn(){
    alert("logIn");
    var mail = $('#login-mail')[0].value;
    var password = $('#login-password')[0].value;
    var credentials = encodeCredentials(mail, password);
}


function encodeCredentials(mail, password, username = null){
    if (username == null){
        return "Basic " + btoa(mail + '{:}' + password);
    } else {
        return "Basic " + btoa(mail + '{:}' + password + '{:}' + username);
    }
}