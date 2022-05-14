const router = require('express').Router();
let Messages= require('../models/messages.model')

router.route('/').get((reg, res) => {
    Messages.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req,res) => {
    const userMessages = req.body.userMessages;
    const numberOfLikes = req.body.numberOfLikes;

    const newMessage = new Messages({
        userMessages,
        numberOfLikes,
    });

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
