const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets/index');
const Users = require('../users/users-model')
const { checkUserPassword } = require('../middleware/checkUserPassword')

router.post('/register', checkUserPassword, (req, res) => {
  let user = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8; 
  const hash = bcrypt.hashSync(user.password, rounds); 
  user.password = hash; 

  Users.add(user) 
  .then(addedUser =>{
    res.status(201).json(addedUser);
  })
  .catch(() =>{
    res.status(401).json("username taken")
  });
});

router.post('/login', checkUserPassword, async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const [user] = await Users.findBy({username});
    if(user && bcrypt.compareSync(password, user.password)){ 
      const token = makeToken(user); 
      res.status(200).json({message: `Welcome back, ${username}`, token}) 
    }else{
      res.status(401).json("invalid credentials")
    }
  }catch(err){
    next(err)
  }
});


function makeToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = { 
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options); 
}

module.exports = router;