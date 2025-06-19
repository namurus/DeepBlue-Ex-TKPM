import uploadFileMiddleware from '../middlewares/uploadFile'; 
import csv from 'csvtojson';
const Student = require('../models/student.model');

jest.mock('csvtojson');
jest.mock('../models/student.model');

describe('uploadFileMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            file: {
                path: 'fake/path/to/file.csv',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();

        jest.clearAllMocks();
    });

    it('should upload file successfully', async () => {
        const fakeCSVData = [
            {
                studentId: 'S1',
                fullName: 'Nguyen Van A',
                dateOfBirth: '2000-01-01',
                gender: 'Male',
                course: 'CS',
                permanentAddress: 'Address1',
                currentAddress: 'Address2',
                mailingAddress: 'Address3',
                email: 'a@example.com',
                phoneNumber: '0123456789',
                identityNumber: '123456',
                identityIssuedDate: '2015-01-01',
                identityExpiryDate: '2025-01-01',
                identityIssuedPlace: 'Place1',
                identityCountry: 'VN',
                identityHasChip: 'true',
                identityNotes: 'None',
                nationality: 'Vietnamese',
                faculty: 'IT',
                program: 'Undergraduate',
                studentStatus: 'Active',
            }
        ];

        csv.mockReturnValue({
            fromFile: jest.fn().mockResolvedValue(fakeCSVData)
        });

        Student.findOne.mockResolvedValue(null);

        Student.insertMany.mockResolvedValue(true);

        await uploadFileMiddleware(req, res, next);

        expect(csv).toHaveBeenCalled();
        expect(csv().fromFile).toHaveBeenCalledWith(req.file.path);
        expect(Student.findOne).toHaveBeenCalledWith({ studentId: 'S1' });
        expect(Student.insertMany).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Upload file successfully' });
    });

    it('should return 400 if studentId already exists', async () => {
        const fakeCSVData = [
            { studentId: 'S1' }
        ];

        csv.mockReturnValue({
            fromFile: jest.fn().mockResolvedValue(fakeCSVData)
        });

        Student.findOne.mockResolvedValue({ studentId: 'S1' });

        await uploadFileMiddleware(req, res, next);

        expect(Student.findOne).toHaveBeenCalledWith({ studentId: 'S1' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Mã số sinh viên S1 đã tồn tại.' });
    });

    it('should return 500 on unexpected error', async () => {
        csv.mockReturnValue({
            fromFile: jest.fn().mockRejectedValue(new Error('CSV parse error'))
        });

        await uploadFileMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV parse error' });
    });
});
