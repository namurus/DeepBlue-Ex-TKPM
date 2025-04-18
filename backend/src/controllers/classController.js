import classService from '../services/classService.js';

let getAllClasses = async (req, res) => {
    try {
        const classes = await classService.getAllClasses();
        return res.status(200).json(classes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let createClass = async (req, res) => {
    try {
        const classData = req.body;
        const newClass = await classService.createClass(classData);
        return res.status(201).json(newClass);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllClasses,
    createClass,
};