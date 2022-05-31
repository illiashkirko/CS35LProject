const { Double } = require('mongodb');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    user: { type: String, required: true},
    userMessages:{ type: String, required: true, index: true },
    numberOfLikes: {type: Number, required: true},
    timeK: {type: Date, required: true},
    comments: {type: Array, required: true}, 
    likeppl: {type: Array, required: true},
}, {
    timestamps:true,
});


const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages; 
