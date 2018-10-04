const mongoose = require('mongoose')

const Message = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    sender : String,
    message : String,
    //date_send : String,
    //relation_id : Number
})
module.exports = mongoose.model('Message', Message)