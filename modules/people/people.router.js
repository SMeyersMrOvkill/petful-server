const express = require('express')
const json = require('body-parser').json()

const People = require('./people.service')

const router = express.Router()

router.get('/', (req, res) => {
  return res.json(People.get());
})

router.get('/minusone', (req, res) => {
  People.dequeue();
  return res.json(People.get());
})

router.post('/', json, (req, res) => {
  const { person } = req.body;
  if(!person) {
    const newPerson = People.enqueueRandom();
    return res.json({message: 'Queued a random person', person: newPerson});
  }
  People.enqueue(person);
  return res.json({message: 'Added ' + person})
})

module.exports = router
