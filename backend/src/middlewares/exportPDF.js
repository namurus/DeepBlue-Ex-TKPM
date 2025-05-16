import PDFDocument from 'pdfkit';
import Grade from '../models/grade.model.js';
import Student from '../models/student.model.js';

let exportTranscriptPDF = async (req, res) => {
    try {
        const studentId = req.query.id;

        const student = await Student.findOne({ studentId });
        if (!student) return res.status(404).send('Student not found');

        const grades = await Grade.find({ studentId });

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=transcript_${studentId}.pdf`);
        doc.pipe(res);

        doc.font('Times-Roman');
        doc.fontSize(20).text('OFFICIAL TRANSCRIPT', { align: 'center' }).moveDown();
        doc.fontSize(12).text(`Student ID: ${student.studentId}`);
        doc.text(`Student Name: ${student.fullName}`).moveDown();

        doc.font('Times-Bold');
        doc.text('No.', 50, doc.y, { continued: true });
        doc.text('Course Code', 100, doc.y, { continued: true });
        doc.text('Course Name', 200, doc.y, { continued: true });
        doc.text('Grade', 265, doc.y);
        doc.font('Times-Roman');

        grades.forEach((grade, index) => {
            const xNo = 50;
            const xCode = 100;
            const xName = 200;
            const xGrade = 420;

            const startY = doc.y;

            // No.
            doc.text(`${index + 1}`, xNo, startY);
            const y1 = doc.y;

            // Course Code
            doc.text(grade.courseCode, xCode, startY);
            const y2 = doc.y;

            // Course Name (có thể xuống dòng)
            doc.text(grade.courseName, xName, startY, { width: 200 });
            const y3 = doc.y;

            // Grade
            doc.text(grade.grade.toFixed(2), xGrade, startY);
            const y4 = doc.y;

            // Lấy dòng cao nhất để tiếp tục ghi dòng sau
            doc.y = Math.max(y1, y2, y3, y4) + 5; // +5 để thêm khoảng cách giữa các dòng
        });
        
        
        

        const total = grades.reduce((sum, g) => sum + g.grade, 0);
        const gpa = grades.length > 0 ? (total / grades.length).toFixed(2) : 'N/A';
        doc.moveDown().font('Times-Bold').text(`GPA: ${gpa}`, { align: 'right' });

        doc.end();
    } catch (err) {
        console.error('PDF Export Error:', err);
        res.status(500).send('Failed to export PDF');
    }
};

module.exports = {
    exportTranscriptPDF,
};
