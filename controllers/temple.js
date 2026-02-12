const db = require('../models');
const Temple = db.temples;

// http-errors factory for consistent HTTP error objects
const createError = require('http-errors');

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// API key guard
function hasValidApiKey(req) {
  return req.header('apiKey') === apiKey;
}

// 401 error for invalid apiKey
function invalidApiKeyError() {
  const err = createError(401, 'Unauthorized');
  err.publicMessage = 'Invalid apiKey';
  err.help = 'Provide a valid apiKey header. See /api-docs';
  return err;
}

// POST/temples
exports.create = (req, res, next) => {
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
    .catch((dbErr) => { // Real database error
      const err = createError(500, 'Server error');
      err.help = 'Try again later. See /api-docs';
      console.error(dbErr);
      return next(err);
    });   
};

// GET/temples
exports.findAll = (req, res, next) => {
  if (!hasValidApiKey(req)) {
    return next(invalidApiKeyError());
  }
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
  .catch((dbErr) => {
    const err = createError(500, 'Server error');
    err.help = 'Try again later. See /api-docs';
    console.error(dbErr);
    return next(err);
  });
};

// GET /temples/:temple_id
exports.findOne = (req, res, next) => {
  const temple_id = req.params.temple_id;
  
  if (!hasValidApiKey(req)) {
    return next(invalidApiKeyError());
  }

  // Using findOne so you get either a document or null (clean 404 logic)
  Temple.findOne({ temple_id: temple_id })
    .then((doc) => {
      if (!doc) {
        const err = createError(404, 'Not found');
        err.publicMessage = `Temple with temple_id=${temple_id} was not found`;
        err.help = 'Verify the temple_id and try again. See /api-docs';
        return next(err);
      }
      return res.send(doc);
    })
    .catch((dbErr) => {
      const err = createError(500, 'Server error');
      err.help = 'Try again later. See /api-docs';
      console.error(dbErr);
      return next(err);
    });
};

// PUT /temples/:id
exports.update = (req, res, next) => {
  if (!req.body) {
    const err = createError(400, 'Bad request');
    err.publicMessage = 'Data to update cannot be empty';
    err.help = 'Provide at least one field to update. See /api-docs'
    return next(err);
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        const err = createError(404, 'Not found');
        err.publicMessage = `Temple with id=${id} was not found`;
        err.help = 'Verify the id and try again. See /api-docs';
        return next(err);
      }
      return res.send({ message: 'Temple was updated successfully.'});
    })
    .catch((dbErr) => {
      const err = createError(500, 'Server error');
      err.help = 'Try again later. See /api-docs';
      console.error(dbErr);
      return next(err);
    });
};

// DELETE /temples/:id
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Temple.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        const err = createError(404, 'Not found');
        err.publicMessage = `Temple with id=${id} was not found`;
        err.help = 'Verify the id and try again. See /api-docs';
        return next(err);
      } 
      return res.status(204).end();
    })
    .catch((dbErr) => {
      const err = createError(500, 'Server error');
      err.help = 'Try again later. See /api-docs';
      console.error(dbErr);
      return next(err);
    });
};

// DELETE /temples
exports.deleteAll = (req, res, next) => {
  Temple.deleteMany({})
    .then((data) => {
      return res.status(204).end();
    })
    .catch((dbErr) => {
      const err = createError(500, 'Server error');
      err.help = 'Try again later. See /api-docs';
      console.error(dbErr);
      return next(err);
    });
};

// // GET
// exports.findAllPublished = (req, res, next) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((dbErr) => {
//       const err = createError(500, 'Server error');
//       err.help = 'Try again later. See /api-docs';
//       console.error(dbErr);
//       return next(err);
//     });
// };
