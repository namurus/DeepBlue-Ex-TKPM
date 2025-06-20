import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';

class StudentStatusValidator {
    validateBeforeUpdate(prevStudent, updatedStudent) {
        if (!prevStudent) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy sinh viên');
        }

        switch (prevStudent.studentStatus) {
            case 'Đã tốt nghiệp':
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đã tốt nghiệp!');
            case 'Đã thôi học':
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đã thôi học!');
            case 'Tạm dừng học':
                if (updatedStudent.studentStatus !== 'Đã tốt nghiệp') {
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đang tạm dừng học!');
                }
                break;
        }
    }
}

module.exports = new StudentStatusValidator();
