const CourseService = require('../src/services/course.service');
const CourseRepository = require('../src/repositories/course.repository');
const ApiError = require('../src/utils/ApiError');

// Mock the CourseRepository methods
jest.mock('../src/repositories/course.repository');

describe('Course Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addCourse', () => {
        it('nên thêm course mới nếu hợp lệ', async () => {
            CourseRepository.findByCourseCode.mockResolvedValue(null);
            CourseRepository.create.mockResolvedValue({ courseCode: 'CS101', courseName: 'Intro to CS' });

            const result = await CourseService.addCourse({
                courseCode: 'CS101',
                courseName: 'Intro to CS',
                creditHours: 3,
            });

            expect(CourseRepository.create).toHaveBeenCalled();
            expect(result.courseCode).toBe('CS101');
        });

        it('nên throw nếu courseCode đã tồn tại', async () => {
            CourseRepository.findByCourseCode.mockResolvedValue({ courseCode: 'CS101' });

            await expect(CourseService.addCourse({
                courseCode: 'CS101',
                courseName: 'Intro to CS',
                creditHours: 3,
            })).rejects.toThrow(ApiError);

            expect(CourseRepository.create).not.toHaveBeenCalled();
        });

        it('nên throw nếu creditHours < 2', async () => {
            CourseRepository.findByCourseCode.mockResolvedValue(null);

            await expect(CourseService.addCourse({
                courseCode: 'CS102',
                courseName: 'Too Easy',
                creditHours: 1,
            })).rejects.toThrow(ApiError);
        });

        it('nên throw nếu prerequisite không tồn tại', async () => {
            CourseRepository.findByCourseCode
                .mockResolvedValueOnce(null) // check courseCode
                .mockResolvedValueOnce(null); // check prerequisite

            await expect(CourseService.addCourse({
                courseCode: 'CS103',
                courseName: 'Advanced',
                creditHours: 3,
                prerequisite: 'CS101',
            })).rejects.toThrow(ApiError);
        });
    });

    describe('getCourseById', () => {
        it('nên trả về course nếu tồn tại', async () => {
            CourseRepository.findById.mockResolvedValue({ _id: '123', courseName: 'Math' });

            const course = await CourseService.getCourseById('123');

            expect(course.courseName).toBe('Math');
            expect(CourseRepository.findById).toHaveBeenCalledWith('123');
        });

        it('nên throw nếu course không tồn tại', async () => {
            CourseRepository.findById.mockResolvedValue(null);

            await expect(CourseService.getCourseById('123')).rejects.toThrow(ApiError);
        });
    });

    describe('deleteCourse', () => {
        it('nên xóa nếu đủ điều kiện', async () => {
            const course = {
                _id: '1',
                createdAt: new Date(),
            };
            CourseRepository.findById.mockResolvedValue(course);
            CourseRepository.findClassesByCourseId.mockResolvedValue([]);
            CourseRepository.deleteById.mockResolvedValue(true);

            const result = await CourseService.deleteCourse('1');
            expect(CourseRepository.deleteById).toHaveBeenCalledWith('1');
        });

        it('nên throw nếu course không tồn tại', async () => {
            CourseRepository.findById.mockResolvedValue(null);

            await expect(CourseService.deleteCourse('404')).rejects.toThrow(ApiError);
        });

        it('nên throw nếu quá 30 phút', async () => {
            const oldCourse = {
                _id: '1',
                createdAt: new Date(Date.now() - 31 * 60 * 1000), // 31 phút trước
            };
            CourseRepository.findById.mockResolvedValue(oldCourse);

            await expect(CourseService.deleteCourse('1')).rejects.toThrow(ApiError);
        });
    });
});
