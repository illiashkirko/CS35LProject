const router = require('express').Router();
let Messages= require('../models/messages.model')   //connecting to messages model

//first route, get requests
router.route('/').get((reg, res) => {
    Messages.find()                             //method that gets all messages from the database
    .then(messages => res.json(messages))       //returns all the messages in JSON format
    .cat(err => res.status(400).json('Error: ' + err));

});

//post requests, adding data to database
router.route('/add').post((req,res) => {
    //extracting data from request
    const userMessages = req.body.userMessages;
    const numberOfLikes = req.body.numberOfLikes;

    //creating new message based on data
    const newMessage = new Messages({
        userMessages,
        numberOfLikes,
    });

    //saving message on db
    newMessage.save()
    .then(()=> res.json('Message submitted'))
    .catch(err=> res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) =>{
    Messages.findById(req.params.id)
    .then(messages => res.json(messages))
    .catch(err=> res.status(400).json('Error' + err));
})
router.route('/:id').delete((req,res)=> {
    Messages.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Messages Deleted'))
    .catch(err=> res.status(400).json('Error' + err));
});

module.exports = router;
