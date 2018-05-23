const jwt = require('jsonwebtoken');
const users = require('../models/users');
const bcrypt = require('bcryptjs');
require('dotenv').config()



module.exports = {
  signUp: function(req, res) {
    users.findOne({
      email: req.body.email
    })
    .then(userData => {
      if(userData == null) {
        const saltRounds = 10;
        let pass = bcrypt.hashSync(req.body.password, saltRounds);
    
        let newUser = new users({
          email: req.body.email,
          password: pass,
          role: req.body.role
        })
    
        newUser.save((err, result) => {
          if(err) {
            console.log(err);
          } else {
            let token = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET)
            res.status(201).json({
              message: 'successfully added a new user !',
              token: token,
              role: result.role
            })
          }
        })
      } else {
        res.status(400).json({
          msg: 'email taken, pick another email!'
        })
      }
    })


  },
  signIn: function(req, res) {
    users
      .findOne({ email: req.body.email})
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET)
          // let userInfo = {
          //   email: user.email,
          //   role: user.role
          // }
          res.status(200).json({
            token: token,
            user: user.role
          })
        } else {
          res.status(500).json({
            msg: 'wrong password or email!'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'wrong password or email!'
        })
      })
  }
};