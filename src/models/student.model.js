const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }

});

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    permanentAddress: addressSchema,
    currentAddress: addressSchema,
    mailingAddress: addressSchema,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    identityDocument: {
        type: {
            type: String,
            enum: ["CMND", "CCCD", "Hộ chiếu"],
            required: true
        },
        number: { type: String, required: true, unique: true },
        issuedDate: { type: Date, required: true },
        expiryDate: { type: Date },
        issuedPlace: { type: String, required: true },
        country: { type: String }, // Chỉ dùng cho passport
        hasChip: { type: Boolean }, // Chỉ dùng cho CCCD
        notes: { type: String } // Chỉ dùng cho passport nếu có ghi chú
    },
    nationality: {
        type: String,
        required: true
    },
    studentFaculties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentFaculty'
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
