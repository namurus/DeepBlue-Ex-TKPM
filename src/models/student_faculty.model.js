const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentFacultySchema = new Schema({
    faculty: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        ref: 'Student',
    },
    program: {
        type: String,
        required: true
    },
    studentStatus: {
        type: String,
        required: true,
        enum: ["Đang học", "Đã tốt nghiệp", "Đã thôi học", "Tạm dừng học"]
    }
}, {
    timestamps: true
});

const StudentFaculty = mongoose.model('StudentFaculty', studentFacultySchema);

module.exports = StudentFaculty;