const mongoose = require('mongoose')

const Relation = new mongoose.Schema({
    "first_id" : {type:String, trim:true, default:''},
    "second_id"  : {type:String, trim:true, default:''},
    "chat_id" : {type:Number, default:0},
    "start_date" : {type:String, trim:true, default:''},
    "progress" : {type:String, trim:true, default:''},
    "status" : {type:String, trim:true, default:''},


})

module.exports = mongoose.model('Relation', Relation)