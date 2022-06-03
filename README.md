# BLink CS35L project

## Contents of this file
  Overview\
  Introduction\
  Library requirments\
  Set-up\
  Troubleshooting\
  Citations

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
  
 
 ## Library requirments 
  The requirements for this project in terms of node libraries are as follows:\
 ### Back-end
 - Node.js
 - Moongose
 - Express
 - cors
 - env
 ### Front end
 - axios
 - react-router-dom
     
    ***Note you will most likely not have to add this libraries manually, but if the error asks you to do so please npm install [library name] in the folder src or server Ex. npm install axios***

 # Set-up
 Please do the following in order to run the Blink app.

```
git clone 
cd blink
```
   ##### For node modules
    Enter blink with cd blink
    Enter src and server folders with cd src and cd server in two different terminals and enter npm install in both to load the requried node module files.
    As stated before add any necessary libraries if there are errors
    For port number change enter the src and server files and change the portNumber.js file to fit the portnumber needed. 
   ***Note that there is a chance the portnumber default will not work for the server, in this case, change the portnumber values in portNumber.js (in src and server respectively) to another port number(they should be the same). The src portnumber value is a string while the server a number type***
 ## Citations
 https://www.w3schools.com/howto/howto_css_dropdown.asp
 
    
