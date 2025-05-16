import { useState, useEffect } from "react";
import api from "../services/api";
import { useTranslation } from 'react-i18next';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "flowbite-react";

function DisplayStudentPage() {
  const [dataTable, setDataTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("studentId"); // Kiểu tìm kiếm (MSSV, tên, khoa)
  const [detailStudent, setDetailStudent] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setDataTable(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append(searchType, searchQuery);
      }

      const res = await api.get(`/students?${params.toString()}`);
      setDataTable(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sinh viên:", error);
      setDataTable([]);
    }
  };

  const showStudentDetails = (student) => {
    setDetailStudent(student);
    setShowDetail(true);
  };

  const closeDetailDialog = () => {
    setShowDetail(false);
    setDetailStudent(null);
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-end items-center">
        {/* Form tìm kiếm */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          {/* Dropdown để chọn kiểu tìm kiếm */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="studentId">{t('search_by_id')}</option>
            <option value="name">{t('search_by_name')}</option>
            <option value="faculty">{t('search_by_faculty')}</option>
          </select>

          {/* Input tìm kiếm */}
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {t('search_button')}
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-4">{t('student_list')}</h1>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>{t('student_id')}</TableHeadCell>
            <TableHeadCell>{t('full_name')}</TableHeadCell>
            {/* <TableHeadCell>Ngày sinh</TableHeadCell>
                        <TableHeadCell>Giới tính</TableHeadCell> */}
            <TableHeadCell>{t('faculty')}</TableHeadCell>
            <TableHeadCell>{t('course')}</TableHeadCell>
            {/* <TableHeadCell>Chương trình</TableHeadCell>
                        <TableHeadCell>Địa chỉ</TableHeadCell> */}
            <TableHeadCell>{t('email')}</TableHeadCell>
            <TableHeadCell>{t('status')}</TableHeadCell>
            <TableHeadCell>{t('action')}</TableHeadCell>
          </TableHead>
          <TableBody>
            {dataTable.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                {/* <TableCell>
                                    {new Date(student.dateOfBirth).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{student.gender}</TableCell> */}
                <TableCell>{student.faculty}</TableCell>
                <TableCell>{student.course}</TableCell>
                {/* <TableCell>{student.program}</TableCell>
                                <TableCell>{student.address}</TableCell> */}
                {/* <TableCell title={student.email}>
                                    {student.email.length > 20
                                        ? student.email.substring(0, 15) + "..."
                                        : student.email}
                                </TableCell> */}
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.studentStatus}</TableCell>
                <TableCell>
                  <button
                    onClick={() => showStudentDetails(student)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    {t('detail')}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal chi tiết sinh viên */}
      {showDetail && detailStudent && (
        <Modal show={showDetail} onClose={closeDetailDialog}>
          <ModalHeader>{t('student_details')}</ModalHeader>
          <ModalBody>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <div className="mb-2"><strong>{t('student_id')}:</strong> {detailStudent.studentId}</div>
                <div className="mb-2"><strong>{t('full_name')}:</strong> {detailStudent.fullName}</div>
                <div className="mb-2"><strong>{t('date_of_birth')}:</strong> {new Date(detailStudent.dateOfBirth).toLocaleDateString()}</div>
                <div className="mb-2"><strong>{t('gender')}:</strong> {detailStudent.gender}</div>
                <div className="mb-2"><strong>{t('faculty')}:</strong> {detailStudent.faculty}</div>
                <div className="mb-2"><strong>{t('course')}:</strong> {detailStudent.course}</div>
                <div className="mb-2"><strong>{t('program')}:</strong> {detailStudent.program}</div>
                <div className="mb-2"><strong>{t('address')}:</strong> {detailStudent.address}</div>
                <div className="mb-2"><strong>{t('email')}:</strong> {detailStudent.email}</div>
                <div className="mb-2"><strong>{t('phone')}:</strong> {detailStudent.phoneNumber}</div>
                <div className="mb-2"><strong>{t('status')}:</strong> {detailStudent.studentStatus}</div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeDetailDialog}>{t('close')}</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export default DisplayStudentPage;
