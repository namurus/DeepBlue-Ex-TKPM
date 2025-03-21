import CRUDService from '../services/CRUDService';

let displayStudent = async (req, res) => {
    try {
        let data;

        if (req.query.studentId) {
            data = await CRUDService.findStudentById(req.query.studentId);
        // Tìm kiếm sinh viên theo tên và khoa
        } else if (req.query.faculty) {
            if (req.query.name) {
                data = await CRUDService.findStudentsByFacultyAndName(req.query.faculty, req.query.name);
            }
            else { data = await CRUDService.findStudentsByFaculty(req.query.faculty); }
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
        return res.redirect('/get-student');

    } catch (e) {
        console.log(e);
        return res.redirect('/get-student');
    }
}

let getUpdateStudentPage = async (req, res) => {
    try {
        let student = await CRUDService.findStudentById(req.query.studentId);

        return res.render('updateStudent.ejs', {
            student: student[0]
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while updating student');
    }
}

let getAddFacultyPage = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        return res.render('addFaculty.ejs', {
            studentId: studentId
        }); 
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while adding faculty');
    }
}

let addFaculty = async (req, res) => {
    try {
    const {faculty, program, studentStatus} = req.body;
    let data = await CRUDService.createFaculty(req.query.studentId, {faculty, program, studentStatus});
        return res.redirect('/get-student');
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while adding faculty');
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
    getUpdateStudentPage: getUpdateStudentPage,
    getAddFacultyPage: getAddFacultyPage,
    addFaculty: addFaculty,
}