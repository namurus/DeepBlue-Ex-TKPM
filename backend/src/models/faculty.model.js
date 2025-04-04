const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyId: {
        type: String,
        required: true,
        unique: true
    },
    facultyName: {
        type: String,
        required: true
    },
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;