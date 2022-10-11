const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.post('/', async (request, response) => {
  const { username, name, email, password } = request.body;

  //Users are not prevented from using the same e-mail at the moment.
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name, 
    email,
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('todos');
  
  response.json(users);
})

module.exports = usersRouter;