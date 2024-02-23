const router = require('express').Router();

const { User, Thought } = require('../models');

router.post('/thought', async (req, res) => {
    const {text, user_id} = req.body;

    const thought = await Thought.create({
        text: text,
        user: user_id
    })

    const updatedUser = await User.findByIdAndUpdate(user_id, {
        $push: {
            thoughts: thought.id
        }
    }, {new: true});

    res.json(updatedUser);
});

router.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find().populate('user', 'username email');

    res.json(thoughts);
});

module.exports - router;