const express = require('express')
const server = express()
// const usersRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')

server.use(express.json())

server.use(logger)
// server.use('api/users', usersRouter)

// global middlewares and the user's router need to be connected here
// server.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//     stack: err.stack,
//   })
// })

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
