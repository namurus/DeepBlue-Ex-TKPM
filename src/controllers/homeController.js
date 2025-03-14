import CRUDService from '../services/CRUDService';

let displayStudent = async (req, res) => {
    try {
        let data;

        if (req.query.studentId) {
            data = await CRUDService.findStudents(req.query.studentId);
        } else {
            data = await CRUDService.getAllStudents();
        }

        console.log('--------------------------');
        console.log(data);
        console.log('--------------------------');

        return res.render('displayStudent.ejs', {
            dataTable: data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while fetching data');
    }
};


let getCreateStudentPage = (req, res) => {
    return res.render('createStudent.ejs');
}

let deleteStudent = async (req, res) => {
    try {
        let data = await CRUDService.deleteStudent(req.query.id);
        return res.redirect('/get-student');
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while deleting student');
    }
}

let createStudent = async (req, res) => {
    try {
        let data = await CRUDService.createStudent(req.body);
        console.log('--------------------------');
        console.log(data);
        console.log(req.body);
        console.log('--------------------------');

        return res.send('Create student successfully');
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while creating student');
    }
} 

module.exports = {
    displayStudent: displayStudent,
    createStudent: createStudent,
    getCreateStudentPage: getCreateStudentPage,
    deleteStudent: deleteStudent,
}