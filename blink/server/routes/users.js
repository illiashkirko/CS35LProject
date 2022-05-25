const router = require('express').Router();
const { ObjectID } = require('bson');
let Users= require('../models/users.model')   //connecting to messages model

//first route, get requests
router.route('/').get((reg, res) => {
    Users.find()                             //method that gets all messages from the database
    .then(users => res.json(users))       //returns all the messages in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});

//post requests, adding data to database
router.route('/add').post((req,res) => {
    //extracting data from request
    const userName = req.body.userName;
    const followers = req.body.followers;
    const following = req.body.following;
    const password = req.body.password;


    //creating new message based on data
    const newUsers = new Users({
        userName,
        followers,
        following,
        password
    });

    //saving message on db
    newUsers.save()
    .then(()=> res.json('Message submitted'))
    .catch(err=> res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) =>{
    Users.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err=> res.status(400).json('Error' + err));
})
router.route('/:id').delete((req,res)=> {
    Users.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Users Deleted'))
    .catch(err=> res.status(400).json('Error' + err));
});

//delete all messages
router.route('/').delete((req,res)=> {
    Users.deleteMany()
    .then(()=> res.json('All Messages Deleted'))
    .catch(err=> res.status(400).json('Error' + err));
});


//updating message on mongoDB
router.route('/update/:id').post((req, res)=> {
    Users.findById(req.params.id)
        .then(users => {
            users.userName = req.body.userName;
            users.followers = req.body.followers;
            users.following = req.body.following;
            users.password = req.body.password;

            users.save()
                .then(() => res.json('Message updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
})

module.exports = router;
