const router = require('express').Router();
const Rental = require('./rental-model')

router.get('/', (req,res)=>{
    Rental.find()
    .then(item =>{
      res.status(200).json(item)
    })
    .catch(() =>{
      res.status(404).json({message: "Could not find rentals."})
    })
})

router.post('/', (req,res)=>{
  const { renter_id, rental_period, owner_id, tech_item_id } = req.body;

  if(!renter_id || !rental_period || !owner_id || !tech_item_id){
    res.status(403).json("Must have: renter_id, rental_period, owner_id, tech_item_id")
  }else{
    Rental.add(req.body)
    .then(techItem =>{
      res.status(201).json(techItem);
    })
    .catch(err =>{
      res.status(401).json({message:"could not add rental", err: err.message })
    })
  }
})

router.put('/:id', (req,res)=>{
  const changes = req.body
  Rental.update(req.params.id, changes)
  .then(newRental =>{
    res.status(201).json(newRental)
  })
  .catch(err =>{
    res.status(401).json({message: "could not update rental", err: err.message })
  })
})

router.delete('/:id', (req,res)=>{
  Rental.remove(req.params.id)
  .then(deleted =>{
    res.status(201).json(deleted)
  })
  .catch(err =>{
    res.status(401).json({message:"could not delete rental", err: err.message })
  })
})

module.exports = router;
