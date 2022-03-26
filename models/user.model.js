const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    gender: String,
    dob: Date,
    mobileNumber: {
        type: String,
        required: [true, 'Mobile field is required']

    },
    userType: String,
    tags: [String],
    credit: Number,
    signedUpInitiatives: [String]
});

mongoose.model('User', userSchema);