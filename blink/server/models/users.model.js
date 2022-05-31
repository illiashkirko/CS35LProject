const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: {type: String, required: true},
    followers: {type: Array, required: true},
    following: {type: Array, required: true},
    password: {type: String, required: true},
    bio: {type: String, required: true},
}, {
    timestamps:true,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users; 
