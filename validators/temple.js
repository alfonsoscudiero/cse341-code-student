/* ***************************
 *  validators/temple.js
 * ************************** */

const Joi = require('joi');

// GET /temples/:temple_id
const templeIdParamSchema = Joi.object({
  temple_id: Joi.number()
    .integer()
    .positive()
    .required()
});

// POST temples
const createTempleSchema = Joi.object({
  temple_id: Joi.number()
    .integer()
    .positive()
    .required(),

  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required(),

  location: Joi.string()
    .trim()
    .min(1)
    .max(150)
    .required(),

  dedicated: Joi.string()
    .trim()
    .max(50)
    .optional(),

  additionalInfo: Joi.boolean()
    .optional(),

  description: Joi.string()
    .trim()
    .max(500)
    .optional()
});

// PUT /temples/:id
const updateTempleSchema = Joi.object({
  temple_id: Joi.forbidden(),

  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .optional(),

  location: Joi.string()
    .trim()
    .min(1)
    .max(150)
    .optional(),

  dedicated: Joi.string()
    .trim()
    .max(50)
    .optional(),

  additionalInfo: Joi.boolean()
    .optional(),

  description: Joi.string()
    .trim()
    .max(500)
    .optional()
});

// DELETE /temples/:id 
const mongoIdParamSchema = Joi.object({
  id: Joi.string()
    .length(24)
    .hex()
    .required()
});

module.exports = {
  templeIdParamSchema,
  createTempleSchema,
  updateTempleSchema,
  mongoIdParamSchema
};