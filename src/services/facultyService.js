const Faculty = require('../models/faculty.model');


const getAllFaculties = async () => {
    try {
        const faculties = await Faculty.find({});
        return faculties;
    } catch (error) {
        console.error('Error fetching faculties:', error);
        throw error;
    }
}

const createFaculty = async (faculty) => {
    try {
        const newFaculty = await Faculty.create(faculty);
        return newFaculty;
    } catch (error) {
        console.error('Error creating faculty:', error);
        throw error;
    }
}

const updateFaculty = async (facultyId, faculty) => {
    try {
        const updatedFaculty = await Faculty.findOneAndUpdate({ facultyId: facultyId }, faculty, { new: true });
        return updatedFaculty;
    }
    catch (error) {
        console.error('Error updating faculty:', error);
        throw error;
    }
}

module.exports = { 
    getAllFaculties: getAllFaculties,
    createFaculty: createFaculty,
    updateFaculty: updateFaculty
};
