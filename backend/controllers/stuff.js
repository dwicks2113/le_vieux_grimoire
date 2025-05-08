
const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  const thing = new Thing({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    license: req.body.license,
    userId: req.body.userId
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  })
    .then(thing => {
      res.status(200).json(thing);
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: 'Book updated successfully!'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (!thing) {
        return res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (thing.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('Unauthorized request!')
        });
      }
      Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
  });
};
  
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

