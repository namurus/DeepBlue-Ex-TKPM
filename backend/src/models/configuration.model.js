const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    currentSchoolYear: String, // Example: "2024-2025"
    semester: Number, // Example: "Semester 1"
}, { collection: 'configurations' });

module.exports = mongoose.model('Configuration', configurationSchema);
