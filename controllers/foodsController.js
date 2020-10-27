const router = require("express").Router();
const Food = require("../models/food");
const Ingredient = require("../models/ingredient");

router.put("/:foodId/ingredients", async (req, res) => {
  let foundFood = await Food.findByIdAndUpdate(
    req.params.foodId,
    {
      $push: {
        ingredients: req.body.ingredients,
      },
    },
    { new: true, upsert: true }
  );
  console.log(foundFood);
  res.redirect(`/foods/${foundFood.id}`);
});

router.get("/new", async (req, res) => {
  let allIngredients = await Ingredient.find();
  res.render("foods/new.ejs", { ingredients: allIngredients });
});

//FILTER THE INGREDIENTS LIST TO SHOW INGREDIENTS THAT ARE NOT IN THE CURRENT FOOD
router.get("/:id", async (req, res) => {
  let foundFood = await Food.findById(req.params.id).populate("ingredients");
  let foundFoodIngredientIds = await Food.findById(req.params.id).populate('ingredients', '_id');
  console.log(`the found food is ${foundFoodIngredientIds}`)
  let filteredIngredients = await Ingredient.find({'_id': { '$nin' : [...foundFoodIngredientIds.ingredients]}});
  res.render("foods/show.ejs", {
    food: foundFood,
    ingredients: filteredIngredients,
  });
});

// send all information for all foods
router.get("/", async (req, res) => {
  let foods = await Food.find().populate("ingredients");
  console.log(`found and populated all foods: ${foods}`);
  res.render("foods/index.ejs", { foods });
});

router.post("/", (req, res) => {
  Food.create(req.body, (error, foods) => {
    res.redirect("/foods");
  });
});
module.exports = router;
