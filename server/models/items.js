const mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
  itemName: String,
  price: Number,
  penjual: String,
  stock: Number,
  image: String
},{
  timestamps: true
})

let item = mongoose.model('item', itemSchema)

module.exports = item;
