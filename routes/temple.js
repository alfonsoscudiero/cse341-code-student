const routes = require('express').Router();
const temples = require('../controllers/temple.js');

/**
 * @swagger
 * /temples:
 *   get:
 *     summary: Get all temples
 *     description: Returns a list of all temples
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
routes.get('/', temples.findAll);

/**
 * @swagger
 * /temples/{temple_id}:
 *   get:
 *     summary: Get a temple by ID
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple found
 *       404:
 *         description: Temple not found
 *       500:
 *         description: Internal server error
 */
routes.get('/:temple_id', temples.findOne);

routes.get('/:temple_id', temples.findOne);

/**
 * @swagger
 * /temples:
 *   post:
 *     summary: Create a new temple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Temple created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
routes.post('/', temples.create);

module.exports = routes;
