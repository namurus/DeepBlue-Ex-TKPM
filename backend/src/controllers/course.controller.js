import courseService from '../services/course.service.js';
import Grade from '../models/grade.model.js';
import { StatusCodes } from 'http-status-codes';
let getAllCourses = async (req, res, next) => {
    try {
        let courses = await courseService.getAllCourses();
        return res.status(StatusCodes.OK).json(courses);
    }
    catch (error) {
        next(error);
    }
}

let getCourseById = async (req, res, next) => {
    try {
        let course = await courseService.getCourseById(req.params.id);
        return res.status(StatusCodes.OK).json(course);
    }
    catch (error) {
        next(error);
    }
}

let addCourse = async (req, res, next) => {
    try {
        let course = await courseService.addCourse(req.body);
        return res.status(StatusCodes.CREATED).json(course);
    }
    catch (error) {
        next(error);
    }
}

let deleteCourse = async (req, res, next) => {
    try {
        let course = await courseService.deleteCourse(req.params.id);
        return res.status(StatusCodes.OK).json(course);
    }
    catch (error) {
        next(error);
    }
}

let updateCourse = async (req, res, next) => {
    try {
        let course = await courseService.updateCourse(req.params.id, req.body);
        return res.status(StatusCodes.OK).json(course);
    }
    catch (error) {
        next(error);
    }
}


module.exports = { 
    getAllCourses: getAllCourses,
    getCourseById: getCourseById,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
    // deactivateCourse: deactivateCourse,
    // updateCourse: updateCourse
};