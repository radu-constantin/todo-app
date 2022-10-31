function customErrorHandler(error, request, response, next) {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Invalid todo ID!' });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: `The '${error.errors.name.path}' field is required!` });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: 'Invalid token'
    })
  } else if (error.name === 'TokenExpiredError') { 
    return response.status(401).json({ error: 'token expired' }) 
  } else {
    next(error);
  }
};

module.exports = customErrorHandler;