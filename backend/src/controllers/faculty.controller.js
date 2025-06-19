import facultyService from "../services/faculty.service";
import { StatusCodes } from 'http-status-codes';

let createFaculty = async (req, res, next) => {
    try {
        let faculty = await facultyService.createFaculty(req.body);
        return res.status(StatusCodes.CREATED).json(faculty);
    } catch (error) {
        next(error);
    }
}

let updateFaculty = async (req, res, next) => {
    try {
        let faculty = await facultyService.updateFaculty(req.params.id, req.body);
        return res.status(StatusCodes.OK).json(faculty);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFaculty: createFaculty,
    updateFaculty: updateFaculty
};