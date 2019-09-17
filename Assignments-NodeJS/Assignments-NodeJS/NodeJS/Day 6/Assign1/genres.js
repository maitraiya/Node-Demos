const {Genre,validate} = require('./genre');
const express = require('express');
const router = express.Router();
const auth= require('./middleware/auth');
const admin = require('./middleware/admin');
const superadmin = require('./middleware/superadmin');
const asyncMiddleware = require('./middleware/async');

router.post('/',[auth,superadmin],asyncMiddleware(async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genre = new Genre({
        name:req.body.name
    });
   
    genre = await genre.save();     
    res.send(genre);
}));

router.get('/',auth,asyncMiddleware(async(req,res)=>{
    const genre = await Genre.find().sort('name');
    res.send(genre);
}));

router.delete('/:id',[auth,admin],asyncMiddleware(async(req,res)=>{
    const id =await  Genre.findByIdAndRemove(req.params.id);    
    if(!id) return res.status(404).send("ID not found");
    res.send(id);
}));
module.exports=router;