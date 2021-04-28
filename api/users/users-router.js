const router = require('express').Router();
const Users = require('./users-model')
const restricted = require('../middleware/restricted')

router.get('/', restricted, (req,res)=>{
    Users.find()
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(() =>{
      res.status(404).json({message: "Could not find users"})
    })
})

module.exports = router;