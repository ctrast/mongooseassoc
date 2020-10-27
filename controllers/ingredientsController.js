const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');

router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});


// CREATE A NEW INGREDIENT
router.post('/', async (req, res) => {
  try {
    let newIngredient = await Ingredient.create(req.body);
    res.redirect("/foods");
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;