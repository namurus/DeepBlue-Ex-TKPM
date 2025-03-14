import CRUDService from '../services/CRUDService';

let displayStudent = async (req, res) => {
    try {
        let data;

        if (req.query.studentId) {
            data = await CRUDService.findStudents(req.query.studentId);
        } else {
            data = await CRUDService.getAllStudents();
        }

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

        return res.redirect('/get-create-student?success=1');
    } catch (e) {
        console.log(e);
        return res.redirect('/get-create-student?error=1');
    }
}

let getUpdateStudentPage = async (req, res) => {
    try {
        let student = await CRUDService.findStudents(req.query.studentId);
        return res.render('updateStudent.ejs', {
            student: student[0]
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while updating student');
    }
}

let updateStudent = async (req, res) => {
    try {
        let data = await CRUDService.updateStudent(req.body);
        return res.redirect('/get-student');
    }
    catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while updating student');
    }
}

module.exports = {
    displayStudent: displayStudent,
    createStudent: createStudent,
    getCreateStudentPage: getCreateStudentPage,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
    getUpdateStudentPage: getUpdateStudentPage
}