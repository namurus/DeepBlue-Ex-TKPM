const Grade = require('../models/grade.model');

async function seedGrade() {
    try {
        // Xoá dữ liệu cũ (nếu cần)
        await Grade.deleteMany({ studentId: '22120223' });

        // Tạo dữ liệu seed
        const gradeData = [
            {
                gradeId: 1,
                studentId: '22120223',
                classCode: 'CS101-A',
                grade: 8.5,
                status: 'Passed',
                remark: 'Good performance'
            },
            // {
            //     gradeId: 2,
            //     studentId: '22120223',
            //     classCode: 'MATH201-B',
            //     grade: 6.2,
            //     status: 'Passed',
            //     remark: null
            // },
            // {
            //     gradeId: 3,
            //     studentId: '22120223',
            //     classCode: 'HIST100-C',
            //     grade: 4.5,
            //     status: 'Failed',
            //     remark: 'Needs improvement'
            // }
        ];

        await Grade.insertMany(gradeData);

        console.log('Grade seed completed!');
        process.exit(0);
    } catch (err) {
        console.error('Grade seed failed:', err);
        process.exit(1);
    }
}
