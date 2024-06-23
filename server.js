const express = require('express');
const ml = require('machine_learning');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const Game = require('./models/Game');

const app = express();
const port = 3000;

const jwtSecret = 'secureSecretKey';

mongoose.connect('mongodb://localhost:27017/game-recommender-db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successful connection to MongoDB');
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    let missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    
    return res.status(400).json({ message: `You must specify ${missingFields.join(', ')}` });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User successfully registered', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'An error occurred during user registration' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'You need to specify email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Successful login', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login error occurred' });
  }
});

app.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error('Error when fetching the games list:', error);
    res.status(500).json({ message: 'An error occurred while fetching the list of games' });
  }
});
  
app.post('/like', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid authorization token format' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.likedGames) {
      user.likedGames = [];
    }

    if (!user.likedGames.includes(req.body.gameId)) {
      user.likedGames.push(req.body.gameId);
      await user.save();
    }

    res.status(200).json({ message: 'Game has been successfully added to favorites' });
  } catch (error) {
    console.error('Error while processing like:', error);
    res.status(500).json({ message: 'An error occurred while processing like' });
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
