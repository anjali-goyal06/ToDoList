
const mongoose = require('mongoose')
const { default: validator } = require('validator')

const UserSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    },

    username :{
        type : String , 
        required : true
    },

    email : {
        type : String , 
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not correct ');
            }
        }
    },

    password : {
        type : String,
        required : true,
        minlength : 8 
    }
})

const User  = mongoose.model('User' , UserSchema)

module.exports  = User