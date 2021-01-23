const Queue = require('../queue/Queue')
const store = require('../../store')

// Set up initial data.
// --------------------

const pets = {
  cats: new Queue(),
  dogs: new Queue()
}

store.cats.forEach(cat => pets.cats.enqueue(cat))
store.dogs.forEach(dog => pets.dogs.enqueue(dog))

// --------------------

module.exports = {
  get() {
    return {
      cat: pets.cats.peek(),
      dog: pets.dogs.peek()
    };
  },

  getDog() {
    return pets.dogs.peek();
  },

  getCat() {
    return pets.cats.peek();
  },

  dequeue(type) {
    if(type.toLowerCase() === 'dog') {
      pets.dogs.dequeue();
    } else if(type.toLowerCase() === 'cat') {
      pets.cats.dequeue();
    } else if (type.toLowerCase() === 'dogcat') {
      pets.dogs.dequeue();
      pets.cats.dequeue();
    }else {
      console.log('Error: We only have cats and dogs. [' + type + ']');
    }
    if(pets.dogs.length() === 0 || pets.dogs.length === 0) {
      store.dogs.forEach(dog => pets.dogs.enqueue(dog))
      store.cats.forEach(cat => pets.cats.enqueue(cat))
    }
  }
}
