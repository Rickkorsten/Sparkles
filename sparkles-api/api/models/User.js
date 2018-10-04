const mongoose = require('mongoose')

const User = new mongoose.Schema({
    "device_id" : {type:String, trim:true, default:''},
    "username"  : {type:String, trim:true, default:''},
    "personal_detail_id" : {type:Number, default:0},
    "team" : {type:String, trim:true, default:''},
    "position" : {type:String, trim:true, default:''},


})

module.exports = mongoose.model('User', User)