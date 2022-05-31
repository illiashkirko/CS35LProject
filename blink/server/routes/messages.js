const router = require('express').Router();
const { ObjectID } = require('bson');
let Messages= require('../models/messages.model')   //connecting to messages model

//returns all messages sorted by time
router.route('/').get((reg, res) => {
    Messages.find().sort( { timeK: -1 }).exec(function(err, messages) { //method that gets all messages from the database sorted based on time
        res.json(messages);                 //returns all the messages in JSON format
       // res.status(400).json('Error: ' + err);
    });                             
});

//returns all messages sorted by number of likes
router.route('/sortedbylikes').get((req, res) => {
    Messages.find().sort( { numberOfLikes: -1 } ).exec(function(err, messages) {
        res.json(messages);
        //res.status(400).json('Error: ' + err);
    });    
 });
//searches all messages by text
router.route('/search/:text').get((req, res) =>{
    Messages.find({ userMessages: { $regex: '.*'+req.params.text+'.*' }})
    .exec(function(err, messages) {
        res.json(messages);
        //res.status(400).json('Error: ' + err);
    });    
});
//searches all messages by username
router.route('/search/username/:user').get((req, res) =>{
    Messages.find({ user: { $regex: '^'+ req.params.user +'$' }})
    .exec(function(err, messages) {
        res.json(messages);
        //res.status(400).json('Error: ' + err);
    });    
});



//post requests, adding data to database
    router.route('/add').post((req,res) => {
    //extracting data from request
    const user = req.body.user;
    const userMessages = req.body.userMessages;
    const numberOfLikes = req.body.numberOfLikes;
    const timeK = req.body.timeK;
    const comments = req.body.comments; 
    const likeppl = req.body.likeppl;

    //creating new message based on data
    const newMessage = new Messages({
        user,
        userMessages,
        numberOfLikes,
        timeK,
        comments,
        likeppl,
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
            message.user = req.body.user;
            message.userMessages = req.body.userMessages;
            message.numberOfLikes = req.body.numberOfLikes;
            message.timeK = req.body.timeK;
            message.comments = req.body.comments;
            message.likeppl = req.body.likeppl;
            message.save()
                .then(() => res.json('Message updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
})

module.exports = router;
