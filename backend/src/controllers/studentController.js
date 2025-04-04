import studentService from '../services/studentService';
import facultyService from '../services/facultyService';
import Student from '../models/student.model';

let displayStudent = async (req, res) => {
    try {
        let data;

        if (req.query.studentId) {
            data = await studentService.findStudentById(req.query.studentId);
            // Tìm kiếm sinh viên theo tên và khoa
        } else if (req.query.faculty) {
            if (req.query.name) {
                data = await studentService.findStudentsByFacultyAndName(req.query.faculty, req.query.name);
            }
            else { data = await studentService.findStudentsByFaculty(req.query.faculty); }
        } else {
            data = await studentService.getAllStudents();
        }

        return res.render('displayStudent.ejs', {
            dataTable: data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while fetching data');
    }
};


// let getCreateStudentPage = (req, res) => {
//     return res.render('createStudent.ejs');
// }
// let createStudent = async (req, res) => {
//     try {
//         const studentId = req.body.studentId;
//         console.log(studentId);

//         if (await Student.findOne({ studentId: studentId })) {
//             return res.redirect('/create-student?error=exists');
//         }

//         await studentService.createStudent(req.body);
//         return res.redirect('/create-student?success=true');

//     } catch (e) {
//         console.error(e); // Log lỗi ra console
//         return res.redirect('/create-student?error=server');
//     }
// };

let getCreateStudentPage = (req, res, error = null, success = false) => {
    return res.render("createStudent.ejs", { error, success });
};

let createStudent = async (req, res) => {
    try {
        const studentId = req.body.studentId;
        const existingStudent = await Student.findOne({ where: { studentId }, attributes: ["id"] });

        if (existingStudent) {
            return getCreateStudentPage(req, res, "Mã số sinh viên đã tồn tại.");
        }

        await studentService.createStudent(req.body);

        return getCreateStudentPage(req, res, null, true);

    } catch (e) {
        console.error("Lỗi khi tạo sinh viên:", e);
        return getCreateStudentPage(req, res, "Lỗi server. Vui lòng thử lại.");
    }
};


let deleteStudent = async (req, res) => {
    try {
        let data = await studentService.deleteStudent(req.query.id);
        return res.redirect('/get-student');
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while deleting student');
    }
}


let getUpdateStudentPage = async (req, res) => {
    try {
        let student = await studentService.findStudentById(req.query.studentId);

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
        let data = await studentService.updateStudent(req.body);
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
}