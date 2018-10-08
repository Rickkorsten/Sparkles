const mongoose = require('mongoose')

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personal_details_id: mongoose.Schema.Types.ObjectId,
    interest_id: mongoose.Schema.Types.ObjectId,
    device_id: { type: String, require: true, unique: true },
    sex: { type: String, require: true, lowercase: true },
    preference: { type: String, require: true, lowercase: true },
    userImage: { type: String, require: true },
    firstName: { type: String, require: true, lowercase: true },
    lastName: { type: String, require: true, lowercase: true }
})
module.exports = mongoose.model('User', User)

// image // still to add
// relations_id [ ] // still to add
 // active_relation_id: { type: mongoose.Schema.Types.ObjectId, require: true, },

 // username for login and device_id ass password