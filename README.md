# BLink CS35L project

## Contents of this file
*  Overview
*  Introduction
*  Set-up
*  Running the app
*  Citations

## Overview
  Our application will be a web application and its purpose is to allow UCLA students to\
  share and discover other students’ opinions and ideas. Our application is a system in which users\
  can post what they feel when they feel. These posts encapsulate their ideas in a few lines and can\
  receive reactions by other users. Our mission is to allow for easy communication of ideas\
  between users in a timely fashion. What motivated this project is the lack of communication and\
  opinions from UCLA students. Oftentimes, we want to see other students’ opinions on classes,\
  clubs, dining halls, etc. However, we can’t really find this information easily anywhere, which is why\
  we decided to make B-link to allow the UCLA community to find this information and also fact\
  as a place to meet other students.

## Introduction 
  This project contains the full source code for the back end and front end of the Blink project.\
  You will be able to actively engage with users on this website and also store and retrieve message data.\
  It contains a server folder, that has the back-end files and a src folder that has the front-end react files.\
  Additionally on the front-end there are four main pages, sign up, home, login and profile page. 

 # Set-up
 You will need Node.js to run you app.
 Please, install Node.js from the official website https://nodejs.org/en/download/.
 
 Next, please do the following to set-up the Blink app.

```
git clone https://github.com/illiashkirko/CS35LProject
cd CS35LProject/blink/src
npm i -f
cd ../server
npm i -f
```
Notice that if the following steps give you an error, try running the following command in src and server folders.
```
npm audit fix --force
```
# Running the app
Please do the following to run the Blink app (we assume that you are in your home directory).
```
cd CS35LProject/blink/src
npm start
```
Now start the backend server on a new terminal.
```
cd CS35LProject/blink/server
npm start
``` 
   ***Note that there is a chance the portnumber default will not work for the server, in this case, change the portnumber values in portNumber.js (in src and server respectively) to another port number (they should be the same).***
 ## Citations
- https://www.w3schools.com/howto/howto_css_dropdown.asp describes useful information on Javasript dropdowns syntaxys.
- Beau Carnes and Carlos Marchena's https://github.com/beaucarnes/mern-exercise-tracker-mongodb provides useful examples of MongoDB schemas.
- https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669 gives a handy information about setting up sign in process using MERN.
- https://www.mongodb.com/languages/mern-stack-tutorial provides an overview of how to use MERN with MongoDB.
- https://reactjs.org/docs/integrating-with-other-libraries.html describes how to integrate ReactJS with jQuery.
- https://javascript.info/ is an overview of Javascript programming language.
- https://www.w3schools.com/howto/howto_css_login_form.asp gives useful resources to create a login form.
- https://reactjs.org/docs/create-a-new-react-app.html is a step by step guide to how to create a react app.
