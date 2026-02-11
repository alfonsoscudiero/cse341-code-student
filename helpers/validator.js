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
      return res.status(422).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message)
      });
    }

    // Replace the original request data with the validated data
    req[source] = value;
    return next();
  };
};

module.exports = validateRequest;