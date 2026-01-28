const routes = require('express').Router();
const temples = require('../controllers/temple.js');


routes.get('/', 
  /* #swagger.summary = 'Get all temples' */
  /* #swagger.description = 'Returns a list of all temples' */
  temples.findAll
);


routes.get('/:temple_id', 
  /* #swagger.summary = 'Get a temple by ID' */
  /* #swagger.description = 'Returns a single temple matching the provided temple ID' */
  temples.findOne
);

routes.post('/', 
  /* #swagger.summary = 'Create a new temple' */
  /* #swagger.description = 'Creates a new temple and stores it in the database' */
  temples.create
);

module.exports = routes;
