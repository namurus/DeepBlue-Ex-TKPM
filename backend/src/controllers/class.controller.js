import classService from '../services/class.service.js';
import { StatusCodes } from 'http-status-codes';

let getAllClasses = async (req, res, next) => {
    try {
        const classes = await classService.getAllClasses();
        return res.status(StatusCodes.OK).json(classes);
    } catch (error) {
        next(error);
    }
}

let createClass = async (req, res, next) => {
    try {
        const classData = req.body;
        const newClass = await classService.createClass(classData);
        return res.status(StatusCodes.CREATED).json(newClass);
    } catch (error) {
        next(error);
    }
}

let addStudentToClass = async (req, res, next) => {
    try {
        const { studentId, classCode } = req.body;
        const enrollment = await classService.addStudentToClass(studentId, classCode);
        return res.status(StatusCodes.CREATED).json(enrollment);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllClasses,
    createClass,
    addStudentToClass,
};