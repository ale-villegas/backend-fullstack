const {model, Schema} = require("mongoose")
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const personSchema = new Schema({
    name : {
        type: String, 
        minlength: 3, 
        required:true,
        unique: true,

    } ,
    number : {
        type: String, 
        minlength: 6, 
        required:true,
    }
})  

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON" , {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = model("Person", personSchema)



module.exports = Person
