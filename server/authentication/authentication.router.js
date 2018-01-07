const express = require('express');
const router = express.Router();
const authController = require('./authentication.controller');

router.post('/authenticate',function(req,res){
  try {
    authController.authenticateUser(req)
    .then(function(user){
      if(!user){
        res.status(401).send({message : 'Login required'});
      }else{
        res.status(200).json({user : user});
      }
    },function(err){
      console.error(err);
      res.status(500).send({message : 'Internal server error..'})
    })
  } catch (e) {
    console.error(e);
    res.status(500).send({message : 'Internal server error..'})
  } finally {

  }
});

router.post('/register',function(req,res){
  try {
    console.log(req.body);
    authController.registerUser(req.body)
    .then(function(user){
      res.status(200).send({message : 'Successfully registered..'});
    },function(err){
      console.error(err);
      res.status(500).send({error : 'Internal server error..'})
    });

  } catch (e) {
    console.error(e);
    res.status(500).send({error : 'Internal server error..'})
  }
});

router.post('/login',function(req,res){
  try {
    authController.loginUser(req.body)
    .then(function(token){
      if(!token){
        res.status(500).send({error : 'Internal server error..'});
      }else{
        res.status(200).send({success : true,access_token : token});
      }
    },function(err){
      console.error(err);
      res.status(500).send({error : 'Internal server error..'});
    });

  } catch (e) {
    console.log(e);
    res.status(500).send({error : 'Internal server error..'});
  }
});

module.exports = router;
