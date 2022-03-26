const mongoose = require('mongoose');
mongoose.SchemaTypeOptions
var initiativeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name : String,
    Crisis : {
        _id: String,
        name: String,
        tags: [String],
        details: String
    },
    volunteersRequired: Number,
    description?: String,
    metaData: {
        dateInitiated: Date,
        dateModified: Date,
        createdBy: String
    },
    signedUpVlunteers: [String]
}); 

mongoose.model('Initiatives', initiativeSchema); 