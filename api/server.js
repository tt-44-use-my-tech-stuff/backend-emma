const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// const restrict = require('./middleware/restricted.js');

const usersRouter = require('./users/users-router')
// const tech_itemsRouter = require('./tech_items/tech_items-router')
const authRouter = require('./auth/auth-router')
// const rentalsRouter = require('./rentals/rentals-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', usersRouter);
// server.use('/api/techitems', tech_itemsRouter)
// server.use('/api/rentals', rentalsRouter)
server.use('/auth', authRouter)


server.get('/', (req,res)=>{
    res.status(200).json({api: "up"})
})

server.use((err,req,res,next)=>{
    res.status(err.status || 500).json({message: err.message, err})
})

module.exports = server;
