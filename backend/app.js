//mondgoDB password: Athena.01
//mondgoDB connection: mongodb+srv://dwicks2113:<db_password>@cluster0.o7wq16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
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

  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next()
});


app.use({'/api/stuff': stuffRoutes});

module.exports = app;
