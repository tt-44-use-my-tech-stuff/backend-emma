const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('./users/users-router')
const techItemsRouter = require('./techItems/techItems-router')
const authRouter = require('./auth/auth-router')
const rentalRouter = require('./rental/rental-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', usersRouter);
server.use('/api/techItems', techItemsRouter)
server.use('/api/rental', rentalRouter)
server.use('/auth', authRouter)


server.get('/', (req,res)=>{
    res.status(200).json({api: "up"})
})

server.use((err,req,res,next)=>{ 
    res.status(err.status || 500).json({message: err.message, err})
})

module.exports = server;
