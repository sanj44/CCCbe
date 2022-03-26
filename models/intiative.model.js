const mongoose = require('mongoose');

mongoose.SchemaTypeOptions
var initiativeSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: String,
    crisis: {
        _id: String,
        name: String,
        tags: [String],
        details: String
    },
    volunteersRequired: Number,
    description: String,
    metaData: {
        dateInitiated: Date,
        dateModified: Date,
        createdBy: String
    },
    signedUpVolunteers: [String],
    tags: [String]
});

mongoose.model('Initiative', initiativeSchema);