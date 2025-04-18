const classService = require('../services/classService');
const Class = require('../models/class.model');
const Student = require('../models/student.model');
const Enrollment = require('../models/enrollment.model');

jest.mock('../models/class.model');
jest.mock('../models/student.model');
jest.mock('../models/enrollment.model');

describe('classService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllClasses', () => {
        it('should return all classes', async () => {
            const mockClasses = [{ classCode: 'C1' }, { classCode: 'C2' }];
            Class.find.mockResolvedValue(mockClasses);

            const result = await classService.getAllClasses();

            expect(Class.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockClasses);
        });

        it('should throw an error if fetching classes fails', async () => {
            Class.find.mockRejectedValue(new Error('Database error'));

            await expect(classService.getAllClasses()).rejects.toThrow('Error fetching classes: Database error');
        });
    });

    describe('createClass', () => {
        it('should create a new class', async () => {
            const classData = { classCode: 'C1', maxStudents: 30 };
            Class.findOne.mockResolvedValue(null);
            Class.prototype.save = jest.fn().mockResolvedValue(classData);

            const result = await classService.createClass(classData);

            expect(Class.findOne).toHaveBeenCalledWith({ classCode: 'C1' });
            expect(Class.prototype.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(classData);
        });

        it('should throw an error if class with the same code exists', async () => {
            const classData = { classCode: 'C1' };
            Class.findOne.mockResolvedValue(classData);

            await expect(classService.createClass(classData)).rejects.toThrow('Class with this code already exists.');
        });

        it('should throw an error if saving the class fails', async () => {
            const classData = { classCode: 'C1' };
            Class.findOne.mockResolvedValue(null);
            Class.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

            await expect(classService.createClass(classData)).rejects.toThrow('Error creating class: Database error');
        });
    });

    describe('addStudentToClass', () => {
        it('should add a student to a class', async () => {
            const studentId = 'S1';
            const classCode = 'C1';
            const mockStudent = { studentId: 'S1' };
            const mockClass = { classCode: 'C1', registeredCount: 0, maxStudents: 30, save: jest.fn() };
            const mockEnrollment = { studentId: 'S1', classCode: 'C1' };

            Student.findOne.mockResolvedValue(mockStudent);
            Class.findOne.mockResolvedValue(mockClass);
            Enrollment.findOne.mockResolvedValue(null);
            Enrollment.prototype.save = jest.fn().mockResolvedValue(mockEnrollment);

            const result = await classService.addStudentToClass(studentId, classCode);

            expect(Student.findOne).toHaveBeenCalledWith({ studentId });
            expect(Class.findOne).toHaveBeenCalledWith({ classCode });
            expect(Enrollment.findOne).toHaveBeenCalledWith({ studentId, classCode });
            expect(mockClass.save).toHaveBeenCalledTimes(1);
            expect(Enrollment.prototype.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEnrollment);
        });

        it('should throw an error if the student does not exist', async () => {
            Student.findOne.mockResolvedValue(null);

            await expect(classService.addStudentToClass('S1', 'C1')).rejects.toThrow('Student not found.');
        });

        it('should throw an error if the class does not exist', async () => {
            const mockStudent = { studentId: 'S1' };
            Student.findOne.mockResolvedValue(mockStudent);
            Class.findOne.mockResolvedValue(null);

            await expect(classService.addStudentToClass('S1', 'C1')).rejects.toThrow('Class not found.');
        });

        it('should throw an error if the student is already enrolled', async () => {
            const mockStudent = { studentId: 'S1' };
            const mockClass = { classCode: 'C1', registeredCount: 0, maxStudents: 30 };
            const mockEnrollment = { studentId: 'S1', classCode: 'C1' };

            Student.findOne.mockResolvedValue(mockStudent);
            Class.findOne.mockResolvedValue(mockClass);
            Enrollment.findOne.mockResolvedValue(mockEnrollment);

            await expect(classService.addStudentToClass('S1', 'C1')).rejects.toThrow('Student is already enrolled in this class.');
        });

        it('should throw an error if the class is full', async () => {
            const mockStudent = { studentId: 'S1' };
            const mockClass = { classCode: 'C1', registeredCount: 30, maxStudents: 30 };

            Student.findOne.mockResolvedValue(mockStudent);
            Class.findOne.mockResolvedValue(mockClass);
            Enrollment.findOne.mockResolvedValue(null);

            await expect(classService.addStudentToClass('S1', 'C1')).rejects.toThrow('Class is full.');
        });
    });
});