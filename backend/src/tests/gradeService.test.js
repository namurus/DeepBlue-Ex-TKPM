const gradeService = require('../services/grade.service');
const GradeRepository = require('../repositories/grade.repository');
const ApiError = require('../utils/ApiError');

jest.mock('../repositories/grade.repository');

describe('Grade Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addGrade', () => {
        it('should add a grade successfully', async () => {
            const fakeGrade = { studentId: '123', subject: 'Math', score: 9.5 };

            GradeRepository.create.mockResolvedValue(fakeGrade);

            const result = await gradeService.addGrade(fakeGrade);

            expect(GradeRepository.create).toHaveBeenCalledWith(fakeGrade);
            expect(result).toEqual(fakeGrade);
        });

        it('should throw ApiError when repository throws', async () => {
            const fakeGrade = { studentId: '123', subject: 'Math', score: 9.5 };
            const error = new Error('DB error');

            GradeRepository.create.mockRejectedValue(error);

            await expect(gradeService.addGrade(fakeGrade)).rejects.toThrow(ApiError);
        });
    });

    describe('getGradesByStudentId', () => {
        it('should return grades for a student', async () => {
            const studentId = '22120223';
            const mockGrades = [
                { subject: 'Math', score: 9.5 },
                { subject: 'Physics', score: 8.5 },
            ];

            GradeRepository.findByStudentId.mockResolvedValue(mockGrades);

            const result = await gradeService.getGradesByStudentId(studentId);

            expect(GradeRepository.findByStudentId).toHaveBeenCalledWith(studentId);
            expect(result).toEqual(mockGrades);
        });

        it('should throw ApiError when repository throws', async () => {
            const studentId = '22120223';
            const error = new Error('DB error');

            GradeRepository.findByStudentId.mockRejectedValue(error);

            await expect(gradeService.getGradesByStudentId(studentId)).rejects.toThrow(ApiError);
        });
    });
});
