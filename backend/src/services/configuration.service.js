const Configuration = require('../models/configuration.model');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const getCurrentSchoolYear = async () => {
    try {
        const config = await Configuration.findOne({});
        if (!config) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Configuration not found');
        }
        return config;
    }
    catch (error) {
        console.error('Error fetching current school year:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching current school year');
    }
}

const handleUpdateCurrentSchoolYear = async () => {
    const config = await Configuration.findOne();

    if (!config || !config.currentSchoolYear || config.semester == null) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Cấu hình năm học hoặc học kỳ chưa được thiết lập');
    }

    let { currentSchoolYear, semester } = config;

    // Nếu học kỳ < 3 thì tăng học kỳ
    if (semester < 3) {
        return await updateCurrentSchoolYear({
            newSchoolYear: currentSchoolYear,
            newSemester: semester + 1
        });
    }

    // Hết học kỳ 3 thì chuyển sang năm học mới
    let [start, end] = currentSchoolYear.split('-').map(Number);
    if (isNaN(start) || isNaN(end)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Định dạng năm học không hợp lệ (VD: 2024-2025)');
    }

    const newSchoolYear = `${start + 1}-${end + 1}`;
    return await updateCurrentSchoolYear({
        newSchoolYear,
        newSemester: 1
    });
};

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
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Lỗi khi cập nhật năm học');
    }
};
module.exports = {
    getCurrentSchoolYear,
    updateCurrentSchoolYear,
    handleUpdateCurrentSchoolYear,
};