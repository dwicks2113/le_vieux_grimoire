const express = require('express');
const router = express.Router();

const Thing = require('../models/thing'); // Import the Thing model

const stuffCtrl = require('../controllers/stuff'); // Import the controller

router.get('/', stuffCtrl.getAllThings); // Use the controller for getting all Things
router.post('/', stuffCtrl.createThing); // Use the controller for creating a Thing
router.get('/:id', stuffCtrl.getOneThing); // Use the controller for getting one Thing
router.put('/:id', stuffCtrl.modifyThing); // Use the controller for modifying a Thing  
router.delete('/:id', stuffCtrl.deleteThing); // Use the controller for deleting a Thing

module.exports = router;