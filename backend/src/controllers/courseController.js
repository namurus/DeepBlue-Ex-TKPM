import courseService from '../services/courseService.js';
import Grade from '../models/grade.model.js';
let getAllCourses = async (req, res) => {
    try {
        await Grade.create
        let courses = await courseService.getAllCourses();
        return res.status(200).json(courses);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

let getCourseById = async (req, res) => {
    try {
        let course = await courseService.getCourseById(req.params.id);
        return res.status(200).json(course);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

let addCourse = async (req, res) => {
    try {
        let course = await courseService.addCourse(req.body);
        return res.status(200).json(course);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

let deleteCourse = async (req, res) => {
    try {
        let course = await courseService.deleteCourse(req.params.id);
        return res.status(200).json(course);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

let updateCourse = async (req, res) => {
    try {
        let course = await courseService.updateCourse(req.params.id, req.body);
        return res.status(200).json(course);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
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