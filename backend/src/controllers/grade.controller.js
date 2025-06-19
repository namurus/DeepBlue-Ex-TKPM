import GradeService from '../services/grade.service.js';
import { StatusCodes } from 'http-status-codes';

let addGrade = async (req, res, next) => {
    try {
        const newGrade = await GradeService.addGrade(req.body);
        return res.status(StatusCodes.CREATED).json(newGrade);
    } catch (error) {
        next(error);
    }
}

let getGradesByStudentId = async (req, res, next) => {
    try {
        const grades = await GradeService.getGradesByStudentId(req.query.studentId);
        return res.status(StatusCodes.OK).json(grades);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addGrade,
    getGradesByStudentId,
}