const mongoose = require('mongoose');

var crisisSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    details: String
}, { collection: 'crisis' });

mongoose.model('Crisis', crisisSchema);