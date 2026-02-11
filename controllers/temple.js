const db = require('../models');
const Temple = db.temples;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Create a Temple
  const temple = new Temple({
    temple_id: req.body.temple_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    dedicated: req.body.dedicated,
    additionalInfo: req.body.additionalInfo
  });
  // Save Temple in the database
  temple
    .save(temple)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Temple.',
      });
    });
};

exports.findAll = (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Temple.find(
      {},
      {
        temple_id: 1,
        name: 1,
        location: 1,
        dedicated: 1,
        additionalInfo: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Temple with an id
exports.findOne = (req, res) => {
  const temple_id = req.params.temple_id;
  
  if (req.header('apiKey') !== apiKey) {
    return res.status(401).send('Invalid apiKey, please read the documentation.');
  }

  // Use findOne so we either get a document or null (clean 404 logic)
  Temple.findOne({ temple_id: temple_id })
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({
          message: `Not found Temple with temple_id=${temple_id}`
        });
      }
      return res.send(doc);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Temple with temple_id=${temple_id}`
      });
    });
};

// Update a Temple by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else res.send({ message: 'Temple was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Temple with id=' + id,
      });
    });
};

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Temple.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else {
        res.send({
          message: 'Temple was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Temple with id=' + id,
      });
    });
};

// Delete all Temples from the database.
exports.deleteAll = (req, res) => {
  Temple.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Temples were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all temple.',
      });
    });
};

// Find all published Temples
exports.findAllPublished = (req, res) => {
  Temple.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving temple.',
      });
    });
};
