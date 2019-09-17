const {user,validate} = require('./user');
const express = require('express');
const _=require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require('./middleware/auth');

router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let alreadyCustomer = await user.findOne({email: req.body.email});
    if(alreadyCustomer) return res.status(400).send("Email already registered");

    usertemp = new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    usertemp.password = await bcrypt.hash(usertemp.password,salt);
    await usertemp.save();     
    
    const token = usertemp.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(usertemp,['_id','name','email']));
})
router.get('/me',auth,async(req,res)=>{
    const searched =await  user.findById(req.user._id).select('-password');
    res.send(searched);
})
module.exports=router;