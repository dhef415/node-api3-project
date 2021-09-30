const router = require('express').Router()
const User = require('./users-model')
const Post = require('../posts/posts-model')
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')



router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:id', validateUserId, (req, res) => {
  console.log(req.user)
})

router.post('/', validateUser, (req, res) => {
  console.log(req.name)

  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
})

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
})

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
