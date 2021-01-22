const Queue = require('../queue/Queue')
const store = require('../../store')
const { randomPeople } = require('../../store')

// Set up initial data.
// --------------------

const people = new Queue()
store.people.forEach(person => people.enqueue(person))

// --------------------

function selectRandomPerson() {
  const index = Math.floor(Math.random() * store.randomPeople.length);
  return store.randomPeople[index];
}

module.exports = {
  get() {
    return people.toArray();
  },

  enqueue(person) {
    people.enqueue(person);
  },

  enqueueRandom() {
    const person = selectRandomPerson();
    people.enqueue(person);
    return person;
  },

  dequeue() {
    people.dequeue();
  }
}
