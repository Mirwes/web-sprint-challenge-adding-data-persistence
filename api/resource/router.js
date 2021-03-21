// build your `/api/resources` router here

const express = require('express');
const Resources = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.getResources()
    .then(resources => {
        res.json(resources)
    })
})

router.post('/', (req,res) => {
    if(!req.body.resource_name)
      res.status(400).send({Message : 'Missing resource_name'})
    else{
      Resources.getResourceByName(req.body.resource_name)
        .then(resource => {
          if(resource)
            res.status(400).send({Message: 'Resource already exists with the given name'})
          else{
            Resources.addResource(req.body)
            .then(resource => {
              res.json(resource[0]);
            })
          }
        })
    }
  });
  
  module.exports = router;