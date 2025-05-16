const Configuration = require('../models/configuration.model');

const getCurrentSchoolYear = async () => {
    try {
        const config = await Configuration.findOne({});
        if (!config) {
            throw new Error('Configuration not found');
        }
        return config;
    }
    catch (error) {
        console.error('Error fetching current school year:', error);
        throw new Error('Error fetching current school year');
    }
}

const updateCurrentSchoolYear = async ({ newSchoolYear, newSemester }) => {
    try {
        const config = await Configuration.findOneAndUpdate(
            {},
            {
                currentSchoolYear: newSchoolYear,
                semester: newSemester,
            },
            { new: true, upsert: true }
        );
        return config;
    } catch (error) {
        console.error('Error updating current school year:', error);
        throw new Error('Error updating current school year');
    }
};

module.exports = {
    getCurrentSchoolYear,
    updateCurrentSchoolYear,
};