const router = require('express').Router();
const { ObjectID } = require('bson');
let Users= require('../models/users.model')   //connecting to users model

//first route, get requests
router.route('/').get((reg, res) => {
    Users.find()                             //method that gets all users from the database
    .then(users => res.json(users))       //returns all the users in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});

//post requests, adding data to database
router.route('/add').post((req,res) => {
    //extracting data from request
    const userName = req.body.userName;
    const followers = req.body.followers;
    const following = req.body.following;
    const password = req.body.password;
    const bio = req.body.bio;
    //creating new user based on data
    const newUsers = new Users({
        userName,
        followers,
        following,
        password,
        bio,
    });

    //saving message on db
    newUsers.save()
    .then(()=> res.json('User added'))
    .catch(err=> res.status(400).json('Error' + err));
});
//look up a user by its username - returns an array!
router.route('/:userName').get((req, res) =>{
    Users.find({ userName: req.params.userName })
    .then(user => res.json(user))
    .catch(err=> res.status(400).json('Error' + err));
})
//look up a user by its id
router.route('/id/:id').get((req, res) =>{
    Users.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err=> res.status(400).json('Error' + err));
})
//delete a user
router.route('/:id').delete((req,res)=> {
    Users.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Users Deleted'))
    .catch(err=> res.status(400).json('Error' + err));
});


//delete all users
router.route('/').delete((req,res)=> {
    Users.deleteMany()
    .then(()=> res.json('All Users Deleted'))
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
            users.bio = req.body.bio;
            users.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
})

module.exports = router;
