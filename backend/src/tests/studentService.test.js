const studentService = require('../services/studentService');
const Student = require('../models/student.model');

jest.mock('../models/student.model');

describe('Student Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findStudentById', () => {
        it('should return a student by ID', async () => {
            const mockStudent = { studentId: '123', name: 'John Doe' };
            Student.find.mockResolvedValue([mockStudent]);

            const result = await studentService.findStudentById('123');

            expect(Student.find).toHaveBeenCalledWith({ studentId: '123' });
            expect(result).toEqual([mockStudent]);
        });

        it('should throw an error if fetching fails', async () => {
            Student.find.mockRejectedValue(new Error('Database error'));

            await expect(studentService.findStudentById('123')).rejects.toThrow('Database error');
        });
    });

    describe('getAllStudents', () => {
        it('should return all students', async () => {
            const mockStudents = [
                { studentId: '123', name: 'John Doe' },
                { studentId: '456', name: 'Jane Doe' },
            ];
            Student.find.mockResolvedValue(mockStudents);

            const result = await studentService.getAllStudents();

            expect(Student.find).toHaveBeenCalledWith({});
            expect(result).toEqual(mockStudents);
        });

        it('should throw an error if fetching fails', async () => {
            Student.find.mockRejectedValue(new Error('Database error'));

            await expect(studentService.getAllStudents()).rejects.toThrow('Database error');
        });
    });

    describe('createStudent', () => {
        it('should create a new student', async () => {
            const mockStudent = { studentId: '123', name: 'John Doe' };
            Student.create.mockResolvedValue(mockStudent);

            const result = await studentService.createStudent(mockStudent);

            expect(Student.create).toHaveBeenCalledWith(mockStudent);
            expect(result).toEqual(mockStudent);
        });

        it('should throw an error if creation fails', async () => {
            Student.create.mockRejectedValue(new Error('Database error'));

            await expect(studentService.createStudent({})).rejects.toThrow('Database error');
        });
    });

    describe('deleteStudent', () => {
        it('should delete a student by ID', async () => {
            Student.findOneAndDelete.mockResolvedValue({ studentId: '123' });

            await studentService.deleteStudent('123');

            expect(Student.findOneAndDelete).toHaveBeenCalledWith({ studentId: '123' });
        });

        it('should throw an error if deletion fails', async () => {
            Student.findOneAndDelete.mockRejectedValue(new Error('Database error'));

            await expect(studentService.deleteStudent('123')).rejects.toThrow('Database error');
        });
    });

    describe('updateStudent', () => {
        it('should update a student', async () => {
            const mockStudent = { studentId: '123', name: 'John Doe', studentStatus: 'Active' };
            const updatedStudent = { ...mockStudent, name: 'John Smith' };

            Student.findOne.mockResolvedValue(mockStudent);
            Student.findOneAndUpdate.mockResolvedValue(updatedStudent);

            const result = await studentService.updateStudent(updatedStudent);

            expect(Student.findOne).toHaveBeenCalledWith({ studentId: '123' });
            expect(Student.findOneAndUpdate).toHaveBeenCalledWith(
                { studentId: '123' },
                updatedStudent,
                { new: true }
            );
            expect(result).toEqual(updatedStudent);
        });

        it('should throw an error if the student has graduated', async () => {
            const mockStudent = { studentId: '123', studentStatus: 'Đã tốt nghiệp' };

            Student.findOne.mockResolvedValue(mockStudent);

            await expect(studentService.updateStudent(mockStudent)).rejects.toThrow('Sinh viên đã tốt nghiệp!');
        });

        it('should throw an error if the student has dropped out', async () => {
            const mockStudent = { studentId: '123', studentStatus: 'Đã thôi học' };

            Student.findOne.mockResolvedValue(mockStudent);

            await expect(studentService.updateStudent(mockStudent)).rejects.toThrow('Sinh viên đã thôi học!');
        });

        it('should throw an error if the student is temporarily suspended and not graduating', async () => {
            const mockStudent = { studentId: '123', studentStatus: 'Tạm dừng học' };
            const updatedStudent = { ...mockStudent, studentStatus: 'Active' };

            Student.findOne.mockResolvedValue(mockStudent);

            await expect(studentService.updateStudent(updatedStudent)).rejects.toThrow('Sinh viên đang tạm dừng học!');
        });
    });
});