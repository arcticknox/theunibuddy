/**
 * Error handler
 * All errors propagated from lower levels handled here centrally
 * Controllers -> Error Middleware -> Central Error Handler
 * @param {Object} error
 * @param {Object} res
 */
const centralErrorHandler = (error, res) => {
  // TODO: Log to file
  console.error('ErrorHandler: ', error);
  res.status(500).send({success: false});
};

export default centralErrorHandler;
