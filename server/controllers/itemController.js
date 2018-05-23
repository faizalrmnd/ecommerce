const jwt = require('jsonwebtoken');
const users = require('../models/users');
const item = require('../models/items');
const bcrypt = require('bcryptjs');
require('dotenv').config()

// itemName: String,
// price: Number,
// penjual: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

module.exports = {
  getItem: function (req, res) {
    item.find({})
    .then(items => {
      res.status(200).json({
        data: items
      })
    })
  },
  addItem: function (req, res) {
      let newItem = new item({
        itemName: req.body.itemName,
        price: req.body.price,
        penjual: req.body.penjual,
        stock: req.body.stock,
        image: req.file.cloudStoragePublicUrl
      })

      newItem.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: 'successfully added a new item !',
            data: result
          })
        }
      })
  },
  editItem: function (req, res) {
    item.findByIdAndUpdate({ _id: req.body.id }, {
      itemName: req.body.itemName,
      price: req.body.price
    })
    .then(update => {
      res.status(200).json({
        message: `berhasil mengubah data`,
        data: update
      })
    })
  },
  deleteItem: function (req, res) {
    item.findByIdAndRemove({ _id: req.body.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  }
}