import facultyService from "../services/facultyService";

let createFaculty = async (req, res) => {
    try {
        let faculty = await facultyService.createFaculty(req.body);
        return res.status(200).json(faculty);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
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
    createFaculty: createFaculty,
    updateFaculty: updateFaculty
};