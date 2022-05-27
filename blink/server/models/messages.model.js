const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    userMessages:{ type: String, required: true },
    numberOfLikes: {type: Number, required: true},
    timeK: {type: Date, required: true},
    comments: {type: Array, required: true} 
}, {
    timestamps:true,
});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages; 
