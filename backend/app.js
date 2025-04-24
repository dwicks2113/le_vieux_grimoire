const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Request received!');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
}); 

app.use((req, res, next) => {
    res.json({
        message: 'Your request was received!'});
    next();
});

app.use((req, res, next) => {
    console.log('Response sent successfully!');
});

// app.use((req, res, next) => {
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

// app.use('/api/stuff', (req, res, next) => {
//   const stuff = [
//     {
//       _id: 'oejfoejf',
//       title: 'My first post',
//       description: 'This is my first post!',
//       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Example.jpg/640px-Example.jpg',
//       price: 100,
//       userId: 'user123'
//     },
//     {
//       _id: 'oejfoejg',
//       title: 'My second post',
//       description: 'This is my second post!',
//       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Example.jpg/640px-Example.jpg',
//       price: 200,
//       userId: 'user456'
//     }
//   ]
//   res.status(200).json(stuff)
// });
module.exports = app;
