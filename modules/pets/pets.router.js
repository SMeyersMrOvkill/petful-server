const express = require('express')
const json = require('body-parser').json()

const Pets = require('./pets.service')
const People = require('../people/people.service')

const router = express.Router()

router.get('/', (req, res) => {
  return res.json(Pets.get());
})

router.get('/cat', (req, res) => {
  return res.json(Pets.getCat());
})

router.get('/dog', (req, res) => {
  return res.json(Pets.getDog());
})

router.delete('/', json, (req, res) => {
  const { type } = req.body;
  if(!type) {
    return res.status(400).json({status: -1});
  }
  if(type.toLowerCase() !== 'dog' && type.toLowerCase() !== 'cat' && type.toLowerCase() !== 'dogcat') {
    return res.status(400).json({status: -2});
  }
  Pets.dequeue(type);
  return res.status(201).json({status: 0});
})


module.exports = router
