const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    personal_data: {
        type: mongoose.Types.ObjectId,
        ref: "PersonalData"
    }
})

const Account = mongoose.model('Account', accountSchema)


module.exports = Account;