const routes = require('express').Router();
const temples = require('../controllers/temple.js');

// Import the wrapper middleware
const validateRequest = require('../helpers/validator');

// Import the schemas
const {
  createTempleSchema,
  updateTempleSchema,
  templeIdParamSchema,
  mongoIdParamSchema
} = require('../validators/temple.js');

/**
 * GET /temples
 */
routes.get('/',
  /* #swagger.summary = 'Get all temples' */
  /* #swagger.description = 'Returns a list of all temples' */

  /* #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API key required to access this endpoint',
      required: true,
      type: 'string',
      example: 'YOUR_API_KEY_HERE'
  } */

  /* #swagger.responses[200] = {
      description: 'List of temples returned successfully'
  } */

  /* #swagger.responses[401] = {
      description: 'Invalid apiKey'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  temples.findAll
);

/**
 * GET /temples/:temple_id
 */
routes.get('/:temple_id',
  /* #swagger.summary = 'Get a temple by temple_id' */
  /* #swagger.description = 'Returns a single temple matching the provided temple_id (numeric).' */

  /* #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API key required to access this endpoint',
      required: true,
      type: 'string',
      example: 'YOUR_API_KEY_HERE'
  } */

  /* #swagger.parameters['temple_id'] = {
      in: 'path',
      description: 'Numeric temple_id',
      required: true,
      type: 'integer',
      example: 28
  } */

  /* #swagger.responses[200] = {
      description: 'Temple returned successfully'
  } */

  /* #swagger.responses[404] = {
      description: 'Temple not found'
  } */

  /* #swagger.responses[422] = {
      description: 'Validation failed (invalid temple_id)'
  } */

  /* #swagger.responses[401] = {
      description: 'Invalid apiKey'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  validateRequest(templeIdParamSchema, 'params'),
  temples.findOne
);

/**
 * POST /temples
 */
routes.post('/',
  /* #swagger.summary = 'Create a new temple' */
  /* #swagger.description = 'Creates a new temple and stores it in the database.' */
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Temple data to create',
    required: true,
    schema: {
      type: 'object',
      required: ['temple_id', 'name', 'location'],
      properties: {
        temple_id: { type: 'integer', example: 100 },
        name: { type: 'string', example: 'Caracas Venezuela Temple' },
        location: { type: 'string', example: 'Caracas, Venezuela' },
        dedicated: { type: 'string', example: '20 August 2000' },
        additionalInfo: { type: 'boolean', example: true },
        description: {
          type: 'string',
          example: 'Granite exterior, one spire with angel Moroni statue. It is located in the Caurimare neighborhood of Caracas.'
        }
      }
    }
} */

  /* #swagger.responses[201] = {
      description: 'Temple created successfully'
  } */

  /* #swagger.responses[422] = {
      description: 'Validation failed (body did not match schema)'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  validateRequest(createTempleSchema, 'body'),
  temples.create
);

/**
 * PUT /temples/:id
 */
routes.put('/:id',
  /* #swagger.summary = 'Update a temple by MongoDB _id' */
  /* #swagger.description = 'Updates a single temple using its MongoDB _id. temple_id cannot be updated.' */

  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId (_id)',
      required: true,
      type: 'string',
      example: '61a921f6028954d4f0319e6d'
  } */

  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Temple fields to update (temple_id cannot be updated)',
      required: true,
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Updated Temple Name' },
          location: { type: 'string', example: 'Updated City, Updated Country' },
          dedicated: { type: 'string', example: 'Renovation' },
          additionalInfo: { type: 'boolean', example: false },
          description: { type: 'string', example: 'Updated description.' }
        }
      }
  } */

  /* #swagger.responses[200] = {
      description: 'Temple updated successfully'
  } */

  /* #swagger.responses[404] = {
      description: 'Temple not found'
  } */

  /* #swagger.responses[422] = {
      description: 'Validation failed (invalid id or body)'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  validateRequest(mongoIdParamSchema, 'params'),
  validateRequest(updateTempleSchema, 'body'),
  temples.update
);

/**
 * DELETE /temples/:id
 */
routes.delete('/:id',
  /* #swagger.summary = 'Delete a temple by MongoDB _id' */
  /* #swagger.description = 'Deletes a single temple using its MongoDB _id.' */

  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId (_id)',
      required: true,
      type: 'string',
      example: '61a921f6028954d4f0319e6d'
  } */

  /* #swagger.responses[200] = {
      description: 'Temple deleted successfully'
  } */

  /* #swagger.responses[404] = {
      description: 'Temple not found'
  } */

  /* #swagger.responses[422] = {
      description: 'Validation failed (invalid id)'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  validateRequest(mongoIdParamSchema, 'params'),
  temples.delete
);

/**
 * DELETE /temples
 */
routes.delete('/',
  /* #swagger.summary = 'Delete all temples' */
  /* #swagger.description = 'Deletes all temples from the database.' */

  /* #swagger.responses[200] = {
      description: 'All temples deleted successfully'
  } */

  /* #swagger.responses[500] = {
      description: 'Server error'
  } */

  temples.deleteAll
);

module.exports = routes;
