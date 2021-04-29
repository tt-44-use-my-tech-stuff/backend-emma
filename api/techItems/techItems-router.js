const router = require('express').Router();
const TechItem = require('./techItems-model')

router.get('/', (req,res)=>{
    TechItem.find()
    .then(item =>{
      res.status(200).json(item)
    })
    .catch(err =>{
      res.status(404).json({message:"could not find tech item", err: err.message })
    })
})

router.post('/', (req,res)=>{
  const { tech_item_title, tech_item_description, tech_item_price, min_rental_period, max_rental_period, category_id, owner_id } = req.body;

  if(!tech_item_title || !tech_item_description || !tech_item_price || !min_rental_period || !max_rental_period || !owner_id || !category_id){
    res.status(403).json("Must have: tech_item_title, tech_item_description, tech_item_price, min_rental_period, max_rental_period, category_id, owner_id")
  }else{
    TechItem.add(req.body)
    .then(addedTechItem =>{
      res.status(201).json(addedTechItem);
    })
    .catch(err =>{
      res.status(401).json({message:"could not add tech item", err: err.message })
    })
  }
})

router.put('/:id', (req,res)=>{
  const changes = req.body
  TechItem.update(req.params.id, changes)
  .then(updated =>{
    res.status(201).json(updated)
  })
  .catch(err =>{
    res.status(401).json({message: "could not update item", err: err.message })
  })
})

router.delete('/:id', (req,res)=>{
  TechItem.remove(req.params.id)
  .then(deleted =>{
    res.status(201).json(deleted)
  })
  .catch(err =>{
    res.status(401).json({message:"could not delete item", err: err.message })
  })
})

module.exports = router;
