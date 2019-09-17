const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:250,
        unique:true
    },    
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1000,
    },
    isAdmin:Boolean,
    isSuperAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin,isSuperAdmin:this.isSuperAdmin},config.get("jwtPrivateKey"));
    return token;
}

const user = mongoose.model("user",userSchema)   

function validateUser(user){
    const schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(250).required().email(),
        password:Joi.string().min(5).max(1000).required(),
    };
    return Joi.validate(user,schema)
}

module.exports.user = user;
module.exports.validate = validateUser;
