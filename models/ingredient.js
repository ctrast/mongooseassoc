const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type:String, unique: true,
    default: '',
  },
  origin: {
    type: {String, unique: true },
    default: '',
  },    
},{timestamps: true}
);

module.exports = mongoose.model('Ingredient', ingredientSchema);