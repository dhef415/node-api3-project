function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalURL
  console.log(`[${timeStamp}] ${method} to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  console.log('validateUserId')
  next()
}

function validateUser(req, res, next) {
  console.log('validateUser')
  next()
}

function validatePost(req, res, next) {
  console.log('validatePost')
  next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
