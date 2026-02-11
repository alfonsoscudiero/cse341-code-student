/* ***************************
 *  helpers/validator.js
 * ************************** */
const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    const payload = req[source];

    const { error, value } = schema.validate(payload, {
      abortEarly: false,   // return all errors at once
      stripUnknown: true,  // remove extra fields not in schema
      convert: true        
    });

    if (error) {
      // Creates a standard JavaScript Error object
      const err = new Error('Validation failed');
      err.status = 422; // HTTP status code
      err.details = error.details.map((d) => d.message); //Joi’s raw validation breakdown
      err.publicMessage = 'Request body did not match required schema';
      err.help = 'See /api-docs for request body requirements';
      // Hands the error to Express and stops running the request
      return next(err);
    }

    // Replace the original request data with the validated data
    req[source] = value;
    return next();
  };
};

module.exports = validateRequest;