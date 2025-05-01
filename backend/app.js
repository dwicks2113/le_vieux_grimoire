//mondgoDB password: Athena.01
//mondgoDB connection: mongodb+srv://dwicks2113:<db_password>@cluster0.o7wq16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const Thing = require('./models/thing') // Import the Thing model
const thing = require('./models/thing')

mongoose
  .connect(
    'mongodb+srv://dwicks2113: Athena.01@cluster0.o7wq16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )

  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!')
  })
  .catch(error => {
    console.log('Unable to connect to MongoDB Atlas!')
    console.error(error)
  })
// json()); // Middleware to parse JSON request bodies
// app.use(mongoose)

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
  const Thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing
    .save()
    .then(
        () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    })
    .catch(
        (error) => {
      res.status(400).json({
        error: error
      });
    });
    
    });

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.fineOne({
        _id: req.params.id
    }) .then(
        (Thing) => {
            res.status(200).json(Thing);
        }
    ).catch((error) => {
        res.status(404).json({
            error: error
        });
    }
    );
});

app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing)
    .then(() => {
        res.status(201).json({
            message: 'Thing updated successfully!'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    }
);  
});


app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
});
module.exports = app;
