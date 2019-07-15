# TrackMe - Cybersecurity project 2019

## Vision

TrackMe is a simple and **secure web application** for position **tracking** from a social point of view;
it tracks your position and shows the positions of your friends.

 
## Components/Architecture

TrackMe is implemented in [nodeJs](https://nodejs.org/it/) and based on a three tier architecture 
(front-end, back-end and a database).


### Front End

* The client implemented is **responsive** (follows [bootstrap](https://getbootstrap.com/) best practices)
* interacts with the server through a RESTFul API


### Back End

* The server is the main core of the application, takes inspiration from this [article](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d) in order to avoid the most commons security mistakes in node programming
	* Routing is supported by [express](https://expressjs.com/it/) middlewares (i.e. `authenticationMiddleware` for session validation)
	* SQL injection is avoided using a no-SQL database (mongoDB) instance hosted on [mLab](https://mlab.com/home) servers and an [orm](https://www.npmjs.com/package/orm)
	* Server API/static files are availble only using a HTTPS calls (for this mockup we create a self-signed SSL certificate with [openSSL](https://www.openssl.org/)
	* Server is sand-boxed into a [Docker](https://www.docker.com/) container which allows on the one hand to protect the server process from the outside hostile environment and, on the other hand to scale (largely used for distributed systems) and be cross-platform


## Main features 

* Log-in/sign-in sends credentials using a basic auth Base64 encoding to an HTTPS end point
* Sign-in uses a third party mailing service ([mailgun](https://www.mailgun.com/)) in order 
to send a second factor authentication code
* Passwords are stored using a SHA-256 hash function (provided by [crypto](https://nodejs.org/api/crypto.html) libarary)
* Sessions are stored in the local storage of the browser and dynamically generated (session lifetime can be increased using a refresh token)
* We are currently using google maps API in order to show the current position of the user


# Get Started 

1. Create ssl certificate and private key using openssl

```
cd TrackMe.BackEnd
mkdir credentials
cd credentials

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```


2. Create a file with your API KEY for the third party services used (Google API KEY, MailGun API KEY, MailGun Domain, DB connection string),
(or a javascript script with the same properties)


```
{
    "maps" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "db": "mongodb://db_user:db_password@host:port/db_name",
    "mailgun_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "mailgun_domain": "XXXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org"
}
```


3. Download node dependencies and start server:

```
cd TrackMe.BackEnd
npm install
node index.js
```


## Disclaimer

> The material contained in this repository is restricted to students/professors of the Cybersecurity course of the Master degree in Multimedia
Communication and Information Technologies and of the Master degree in Computer Science at University of Udine.
>> It prohibited any use other than that inherent to the course, and in particular is expressly prohibited its use for any commercial purposes and/or for profit.

* License: [GPL-3](https://it.wikipedia.org/wiki/GNU_General_Public_License)