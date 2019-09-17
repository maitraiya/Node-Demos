const {user} = require('./user');
const express = require('express');
const mongoose = require('mongoose');
const _=require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require('joi');


router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customer = await user.findOne({email: req.body.email});
    if(!customer) return res.status(400).send("User Not registered");

    const validatePassword = await bcrypt.compare(req.body.password,customer.password);
    if(!validatePassword) return res.status(400).send("User Not registered");
    const token = customer.generateAuthToken();
    res.send(token);
})
function validate(user){
    const schema={
        email:Joi.string().min(5).max(250).required().email(),
        password:Joi.string().min(5).max(1000).required()
    };
    return Joi.validate(user,schema)
}

module.exports=router;