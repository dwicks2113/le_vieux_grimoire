const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // Import the authentication middleware
const stuffCtrl = require('../controllers/stuff'); // Import the controller

router.get('/', auth, stuffCtrl.getAllThings); // Use the controller for getting all Things
router.post('/', auth, stuffCtrl.createThing); // Use the controller for creating a Thing
router.get('/:id', auth, stuffCtrl.getOneThing); // Use the controller for getting one Thing
router.put('/:id', auth, stuffCtrl.modifyThing); // Use the controller for modifying a Thing  
router.delete('/:id', auth, stuffCtrl.deleteThing); // Use the controller for deleting a Thing

module.exports = router;