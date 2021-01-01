const mongoose = require('mongoose')

const { Schema } = mongoose

const toDoSchema = new Schema({
    text : {
        type : String,
        required :true
    } ,
    isCompleted :  {
        type : Boolean , 
        default : false
    } ,
    createdDate : {
        type : Date , 
        default : Date.now
    } ,

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

module.exports = mongoose.model('ToDo', toDoSchema)