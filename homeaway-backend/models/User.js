const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profile: {
        country: String,
        university: String,
        interests: [String],
        challenges: [String]
    }
});

module.exports = mongoose.model('User', UserSchema);
