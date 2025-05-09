const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const User = require('../models/users'); // Import the User model
const express = require('express');
const { MongoUnexpectedServerResponseError } = require('mongodb');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created!' }))
                .catch(error => res.status(400).json({ 
                    error: error,
                    message: 'User already exists!'}));
        })  
        .catch(error => res.status(500).json({ 
            error: error }));
};

exports.login = (req, res, next) => {
 user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Incorrect password!' });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN',
                        { expiresIn: '24h' }); // Token expiration time
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ) .catch(error => res.status(500).json({ error: error })
                );
            })
        .catch(error => res.status(500).json({ error: error }));
     };
        