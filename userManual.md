# User Manual

The application is really simple, it is based on 3 main views:


## Login/Signin view

![login view](projectCode/views/common/assets/login-view.png)

> this first view allows to register yourself or login 


## Check view

![check view](projectCode/views/common/assets/check-view.png)

> In case of sign-in the user needs also to validate his credentials with a 
second authentication check (a numeric code sent via mail)


## Main view

![main view](projectCode/views/common/assets/main-view.png)
![main view 2](projectCode/views/common/assets/main2-view.png)

> Once session token is created, the user can see his friends positions and state,
and the user position is stored every second in the db 

![redirect](projectCode/views/common/assets/redirection.png)

After a while session token will expire and user is redirected to the login page