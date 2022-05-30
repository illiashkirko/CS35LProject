const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: {type: String, required: true},
    followers: {type: Number, required: true},
    following: {type: Number, required: true},
    password: {type: String, required: true}

}, {
    timestamps:true,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users; 
