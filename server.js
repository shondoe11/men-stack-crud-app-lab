//* imports -> require
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Music = require('./models/Music');

//* config
const app = express();
const log = require("debug")("music:server");
const port = 3000;
app.set('view engine', 'ejs');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//* middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

//* routes

//home
app.get('/', (req, res) => {
    res.render('index.ejs');
});

//index - display all music entries
app.get('/music', async (req, res) => {
  try {
    const musicList = await Music.find({});
    res.render('music/index', {musicList});
  } catch (err) {
    console.error(err);
    res.send('err getting musicList');
  }
});

//new (form page)
app.get('/music/new', (req, res) => {
  res.render('music/new');
});

//create
app.post('/music', async (req, res) => {
  try {
    await Music.create(req.body);
    res.redirect('/music');
  } catch (err) {
    console.error(err);
    res.send('err creating music entry');
  }
});

//show (display music entry by ID)
app.get('/music/:id', async (req, res) => {
  try {
    const musicEntry = await Music.findById(req.params.id);
    res.render('music/show', {musicEntry});
  } catch (err) {
    console.error(err);
    res.send('err getting music id');
  }
});

//edit (pre-existing entry)
app.get('/music/:id/edit', async (req, res) => {
  try {
    const musicEntry = await Music.findById(req.params.id);
    res.render('music/edit', {musicEntry})
  } catch (err) {
    console.error(err);
    res.send('err getting music id');
  }
});

//update (entry by id)
app.put('/music/:id', async (req, res) => {
  try {
    await Music.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/music/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send('err updating entry');
  }
});

//delete (entry by id)
app.delete('/music/:id', async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.redirect('/music');
  } catch (err) {
    console.error(err);
    res.send('err deleting entry');
  }
});


//* listen
app.listen(port, () => {
  log(`Example app listening on port ${port}`);
});