// const Grade = require('../models/grade.model');
// const Enrollment = require('../models/enrollment.model'); 

// async function createGradesFromEnrollment() {
//     try {
//         // Fetch all enrollments
//         const enrollments = await Enrollment.findAll();

//         // Iterate through enrollments and create grades
//         for (const enrollment of enrollments) {
//             const randomGrade = parseFloat((Math.random() * 9 + 1).toFixed(1)); // Random float between 1.0 and 10.0
//             await Grade.create({
//                 enrollmentId: enrollment.id,
//                 grade: randomGrade,
//             });
//         }

//         console.log('Grades created successfully.');
//     } catch (error) {
//         console.error('Error creating grades:', error);
//     }
// }

// module.exports = {
//     createGradesFromEnrollment,
// };