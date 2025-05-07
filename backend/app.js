//mondgoDB password: Athena.01
//mondgoDB connection: mongodb+srv://dwicks2113:<db_password>@cluster0.o7wq16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
console.log('MondoDB URI:', process.env.MONGO_URI); // Log the MongoDB URI to check if it's being loaded correctly

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
    connectTimeoutMS: 10000
  })
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Unable to connect to MongoDB Atlas!', error));

const Thing = require('./models/thing') // Import the Thing model

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.post('/api/stuff', (req, res, next) => {
  const newThing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  })
  newThing
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
})

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  })
    .then(foundThing => {
      res.status(200).json(Thing)
    })
    .catch(error => {
      res.status(404).json({
        error: error
      })
    })
})

app.put('/api/stuff/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  })
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
})

app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => {
      res.status(200).json(things)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
})
module.exports = app
