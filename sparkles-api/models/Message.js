const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    "sender" : {type:String, trim:true, default:''},
    "message"  : {type:String, trim:true, default:''},
    "date_send" : {type:Date, trim:true, default:Date.now},
    "relation_id" : {type:Date, trim:true, default:Date.now},
})
module.exports = mongoose.model('Message', Message)