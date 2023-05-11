const errorHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
};

const notFoundHandler = (req, res, _) => {
  res.status(404).send(`Page ${req.path} does not exist in this server`);
};

module.exports = errorHandler;
module.exports = notFoundHandler;