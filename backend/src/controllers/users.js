const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (username.length === 0 || password.length === 0) {
    return response.status(400).json({
      error: 'Fields cannot be empty!'
    })
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('todos', {name: 1, done: 1, createdAt: 1, updatedAt: 1, id: 1});
  
  response.json(users);
})

module.exports = usersRouter;