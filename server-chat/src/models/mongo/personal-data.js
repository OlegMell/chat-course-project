const mongoose = require('mongoose');

const personalDataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    username: String,
    bio: String,
    image: String
})

const PersonalData = mongoose.model('PersonalData', personalDataSchema)


module.exports = PersonalData;