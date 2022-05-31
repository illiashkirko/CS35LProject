// import myPort from "../src/global_variables.js";
// console.log(myPort);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { application } = require('express');
require('dotenv').config();

const blinkApp = express ();
const port = process.envPort|| 5056;

blinkApp.use(cors());
blinkApp.use(express.json());

const url= "mongodb+srv://LiyuZer:bFnkjqtwOXOvlwh6@blink.do1er.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open', () =>{

    console.log("The connection was established");
})

const usersRouter= require('./routes/users');
const messageRouter= require('./routes/messages');

blinkApp.use('/messages', messageRouter);
blinkApp.use('/users', usersRouter);

blinkApp.listen(port, ()=> {

    console.log(`port: ${port}`)
});