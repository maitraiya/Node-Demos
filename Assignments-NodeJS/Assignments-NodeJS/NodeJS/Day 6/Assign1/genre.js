const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
});

const Genre = mongoose.model("Genre",genreSchema)   

function validateGenre(Genre){
    const schema={
        name:Joi.string().min(5).max(50).required()
    };
   
    return Joi.validate(Genre,schema)
}

exports.Genre = Genre;
exports.validate = validateGenre;
