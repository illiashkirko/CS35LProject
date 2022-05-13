const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    userMessages:{ type: String, required: true },
    numberOfLikes: {type:Number, required: true}
}, {
    timestamps:true,
});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages; 
