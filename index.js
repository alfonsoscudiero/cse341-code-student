const express = require('express');
const cors = require('cors');
// http-errors factory
const createError = require('http-errors');
// Import Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

// Swagger docs
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API routes
  .use('/', require('./routes'));

 // 404 Not Found Handler 
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isClientError = statusCode >= 400 && statusCode < 500;

  // Standardized JSON error contract
  const responseBody = {
    statusCode,
    message: err.message || (isClientError ? 'Request failed' : 'Server error'),

    // "error" is the useful detail (safe for 4xx; generic for 5xx)
    error: isClientError
      ? (err.publicMessage || err.message || 'Request could not be processed')
      : 'Unexpected error',

    // "help" tells the client where to look next
    help: err.help || 'See /api-docs for usage requirements',

    // Helpful debugging metadata
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };

  // Include Joi validation details when provided
  if (Array.isArray(err.details) && err.details.length > 0) {
    responseBody.details = err.details;
  }

  // Log server-side details for unexpected errors (5xx)
  if (!isClientError) {
    console.error(err);
  }

  res.status(statusCode).json(responseBody);
});

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
