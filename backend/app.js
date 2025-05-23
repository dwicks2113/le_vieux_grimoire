//mondgoDB password: Athena.01
//mondgoDB connection: mongodb+srv://dwicks2113:<db_password>@cluster0.o7wq16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user'); // Import the user routes
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
  app.use('/images', express.static(path.join(__dirname, 'images')));
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


app.get({'/routes/stuff': stuffRoutes});
app.get({'/routes/user': userRoutes}); // Use the user routes
app.get(bodyParser.json()); // Parse JSON bodies (as sent by API clients)

module.exports = app;
