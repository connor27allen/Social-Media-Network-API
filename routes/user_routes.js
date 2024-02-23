// Create a 'router' using express
const router = require('express').Router();  //router is a CHILD of the server app
// Import the User model
const { User } = require('../models');
const { handleRouteError } = require('./helpers');
/*
Create a POST route to register a new user and send the new user object back to the client
  - If mongoose throws an 11000 error(unique/already created), send back a json response with a 'User already exists' message
  - For any other mongoose errors(err.errors), send back a json response with a 'messages' property that is an array of all mongoose errors that were thrown
*/
router.get('/', async (req, res) => {
  try{
    const users = await User.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    });

    res.json(users);
  } catch (err) {
    handleRouteError(err, res);
  }
});

router.post('/register', async (req, res) => {
  try{
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    handleRouteError(err, res);
  }
});

//find a user by id
router.get('/users/:id', async (req, res) => {
  try{
    const user = await User.findById(user_id).populate('thoughts', 'text').populate('friends', 'text');

    res.json(user);
  } catch (err) {
    handleRouteError(err, res);
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });

    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with this id!' });
      return;
    }

    res.json(dbUserData);
  } catch (err) {
    handleRouteError(err, res);
  }
});

router.delete('/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
      await User.deleteOne({_id: req.params.user_id});

      res.json({
          message: 'user deleted successfully'
      });
  } catch (err) {
      handleRouteError(err, res);
  }
});

//delete a friend
router.delete( '/:id/:friendId', async ({ params }, res) => {
  try {
      const dbUsersData = await Users.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true }
      ).populate({ path: 'friends', select: '-__v' }).select('-__v');

      if (!dbUsersData) {
          res.status(404).json({ message: 'No User with this particular ID!' });
          return;
      }

      res.json(dbUsersData);
  } catch (err) {
      res.status(400).json(err);
  }
});

// Export the router object
module.exports = router;