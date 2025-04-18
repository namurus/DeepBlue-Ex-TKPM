const Class = require('../models/class.model'); // Assuming the Class model is in ../models/Class

async function getAllClasses() {
    try {
        const classes = await Class.find();
        return classes;
    } catch (error) {
        throw new Error(`Error fetching classes: ${error.message}`);
    }
}

async function createClass(classData) {
    try {
        // Check if a class with the same classCode already exists
        const existingClass = await Class.findOne({ classCode: classData.classCode });
        if (existingClass) {
            throw new Error('Class with this code already exists.');
        }

        // Create a new class
        const newClass = new Class(classData);
        await newClass.save();

        return newClass;
    } catch (error) {
        throw new Error(`Error creating class: ${error.message}`);
    }
}

module.exports = {
    getAllClasses,
    createClass,
};