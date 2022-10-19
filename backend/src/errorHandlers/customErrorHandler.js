function customErrorHandler(error, request, response, next) {
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'Invalid todo ID!' });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: `The '${error.errors.name.path}' field is required!` });
  } else {
    next(error);
  }
};

module.exports = customErrorHandler;