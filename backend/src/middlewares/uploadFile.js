import csv from 'csvtojson';
const Student = require('../models/student.model');

const uploadFileMiddleware = async (req, res, next) => {
    try {
        const studentData = [];
        const response = await csv().fromFile(req.file.path); // ✅ dùng await thay vì .then

        for (let x = 0; x < response.length; x++) {
            const studentId = response[x].studentId;
            const existingStudent = await Student.findOne({ studentId: studentId }); // ✅ dùng findOne thay vì find

            if (existingStudent) {
                return res.status(400).json({ message: `Mã số sinh viên ${studentId} đã tồn tại.` });
            }

            studentData.push({
                studentId: response[x].studentId,
                fullName: response[x].fullName,
                dateOfBirth: response[x].dateOfBirth,
                gender: response[x].gender,
                course: response[x].course,
                permanentAddress: response[x].permanentAddress,
                currentAddress: response[x].currentAddress,
                mailingAddress: response[x].mailingAddress,
                email: response[x].email,
                phoneNumber: response[x].phoneNumber,
                identityNumber: response[x].identityNumber,
                identityIssuedDate: response[x].identityIssuedDate,
                identityExpiryDate: response[x].identityExpiryDate,
                identityIssuedPlace: response[x].identityIssuedPlace,
                identityCountry: response[x].identityCountry,
                identityHasChip: response[x].identityHasChip.toLowerCase() === 'true',
                identityNotes: response[x].identityNotes,
                nationality: response[x].nationality,
                faculty: response[x].faculty,
                program: response[x].program,
                studentStatus: response[x].studentStatus,
            });
        }

        await Student.insertMany(studentData);
        return res.status(200).json({ message: 'Upload file successfully' }); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Unexpected error occurred' });
    }
};

export default uploadFileMiddleware;
