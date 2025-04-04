import facultyService from "../services/facultyService";

let displayAddFaculty = (req, res) => {
    return res.render('addFaculty.ejs');
}

let createFaculty = async (req, res) => {
    try {
        let faculty = await facultyService.createFaculty(req.body);
        return res.redirect('/faculty/?success=create_faculty_success');
    } catch (e) {
        console.log(e);
        return res.redirect('/faculty/?error=create_faculty_failed');
    }
}

let updateFaculty = async (req, res) => {
    try {
        let faculty = await facultyService.updateFaculty(req.params.id, req.body);
        return res.status(200).json(faculty);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

module.exports = {
    displayAddFaculty: displayAddFaculty,
    createFaculty: createFaculty,
    updateFaculty: updateFaculty
};