const { Double } = require('mongodb');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    userMessages:{ type: String, required: true, index: true },
    numberOfLikes: {type: Number, required: true},
    timeK: {type: Date, required: true},
    comments: {type: Array, required: true} 
}, {
    timestamps:true,
});

messagesSchema.index({ userMessages: "text" }); //creating new search pattern
const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages; 
