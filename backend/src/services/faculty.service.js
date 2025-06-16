const Faculty = require('../models/faculty.model');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

const getAllFaculties = async () => {
    try {
        const faculties = await Faculty.find({});
        return faculties;
    } catch (error) {
        console.error('Error fetching faculties:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching faculties');
    }
}

const createFaculty = async (faculty) => {
    try {
        const newFaculty = await Faculty.create(faculty);
        return newFaculty;
    } catch (error) {
        console.error('Error creating faculty:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error creating faculty');
    }
}

const updateFaculty = async (facultyId, faculty) => {
    try {
        const updatedFaculty = await Faculty.findOneAndUpdate({ facultyId: facultyId }, faculty, { new: true });
        return updatedFaculty;
    }
    catch (error) {
        console.error('Error updating faculty:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating faculty');
    }
}

module.exports = { 
    getAllFaculties: getAllFaculties,
    createFaculty: createFaculty,
    updateFaculty: updateFaculty
};
