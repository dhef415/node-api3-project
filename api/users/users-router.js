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

router.get('/:id', validateUserId, (req, res, next) => {
  try {
    res.json(req.user)
  } catch (err) {
    next(err)
  }
})

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await User.remove(req.params.id)
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
})

router.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
