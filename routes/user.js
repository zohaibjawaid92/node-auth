const express = require('express');
const route = express.Router ();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

route.get('/' , function(req,res){
    res.send('hello from the server');
});

// Middleware to verify Token
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).status('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payLoad = jwt.verify(token , config.secretKey);
    if(!payLoad){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payLoad.subject
    next();
}

/* Code Developed for beginners to understand the better! */  
route.post('/login', function(req,res) {
      let userData = req.body;
      User.findOne({email : userData.email} , (user ,err) => {
          if(err){
              console.log(err);
          } else {
              if(!user){
                 res.status(401).send('Invalid Email');
              }else{
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid Password');
                }else{
                    let payLoad = {subject : user._id}
                    let token = jwt.sign(payLoad , config.secretKey);
                    res.status(200).send({token});
                }
              }
          }
      })
})


// username : '' , password : ''
route.post('/signup' , function(req,res){
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        } else {
            let payLoad = {subject : registeredUser._id}
            let token = jwt.sign(payLoad , config.secretKey)
            res.status(200).send({token});
        }
    }) 
})

// Authenticated Api
route.post('/edit' , verifyToken, function(req,res){
    // edit user profile..
})

module.exports = route;