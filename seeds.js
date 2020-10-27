const mongoose = require('mongoose');

const Food = require('./models/food');
const Ingredient = require('./models/ingredient');

const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);
//Wait for ingredients to be added before pushing to the food
async function seed() {
  
  await mongoose.connection.dropCollection('ingredients');
  await mongoose.connection.dropCollection('foods');


  // CREATE THREE INGREDIENTS
  const cheddar = await Ingredient.create({
    name: 'cheddar cheese',
    origin: 'Wisconsin',
  });

  const eggs = await Ingredient.create({
    name: 'eggs',
    origin: 'Minnesota',
  });
  
  const dough = await Ingredient.create({
    name: 'dough',
    origin: 'Iowa',
  });

  // CREATE A NEW FOOD - in memory
  const cheesyQuiche = new Food({
    name: 'Quiche',
    ingredients: [],
  });

  // // PUSH THE INGREDIENTS ONTO THE FOOD'S
  // // INGREDIENTS ARRAY which is in memory - then save to mongo db

  cheesyQuiche.ingredients.push(dough);
  cheesyQuiche.ingredients.push(eggs);
  cheesyQuiche.ingredients.push(cheddar); // associated!
  cheesyQuiche.save(function (err, savedCheesyQuiche) {
    if (err) {
      console.log(err);
    } else {
      console.log('cheesyQuiche food is ', savedCheesyQuiche);
    }
  });
}

seed();