const router = require('express').Router();
const { ObjectID } = require('bson');
let Messages= require('../models/messages.model')   //connecting to messages model

//first route, get requests
router.route('/').get((reg, res) => {
    Messages.find()                             //method that gets all messages from the database
    .then(messages => res.json(messages))       //returns all the messages in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});

//post requests, adding data to database
router.route('/add').post((req,res) => {
    //extracting data from request
    const userMessages = req.body.userMessages;
    const numberOfLikes = req.body.numberOfLikes;
    const timeK = req.body.timeK;

    //creating new message based on data
    const newMessage = new Messages({
        userMessages,
        numberOfLikes,
        timeK
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

//delete all messages
router.route('/').delete((req,res)=> {
    Messages.deleteMany()
    .then(()=> res.json('All Messages Deleted'))
    .catch(err=> res.status(400).json('Error' + err));
});

//updating message on mongoDB
router.route('/update/:id').post((req, res)=> {
    Messages.findById(req.params.id)
        .then(message => {
            message.userMessages = req.body.userMessages;
            message.numberOfLikes = req.body.numberOfLikes;
            message.timeK = req.body.timeK;
            message.save()
                .then(() => res.json('Message updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
})

module.exports = router;