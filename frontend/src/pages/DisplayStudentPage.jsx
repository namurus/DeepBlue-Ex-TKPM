import { useState, useEffect } from "react";
import api from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalFooter, ModalHeader, Button, FloatingLabel } from "flowbite-react";

function DisplayStudentPage() {
    const [dataTable, setDataTable] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("studentId"); // Kiểu tìm kiếm (MSSV, tên, khoa)
    const [detailStudent, setDetailStudent] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

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
                        <option value="studentId">Mã sinh viên</option>
                        <option value="name">Tên sinh viên</option>
                        <option value="faculty">Khoa</option>
                    </select>

                    {/* Input tìm kiếm */}
                    <input
                        type="text"
                        placeholder="Nhập từ khóa tìm kiếm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 rounded w-full"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Tìm
                    </button>
                </form>
            </div>

            <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>

            <div className="overflow-x-auto">
                <Table striped>
                    <TableHead>
                        <TableHeadCell>Mã SV</TableHeadCell>
                        <TableHeadCell>Họ tên</TableHeadCell>
                        {/* <TableHeadCell>Ngày sinh</TableHeadCell>
                        <TableHeadCell>Giới tính</TableHeadCell> */}
                        <TableHeadCell>Khoa</TableHeadCell>
                        <TableHeadCell>Khóa</TableHeadCell>
                        {/* <TableHeadCell>Chương trình</TableHeadCell>
                        <TableHeadCell>Địa chỉ</TableHeadCell> */}
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Tình trạng</TableHeadCell>
                        <TableHeadCell>Hành động</TableHeadCell>
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
                                        Chi tiết
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
                    <ModalHeader>Chi tiết sinh viên</ModalHeader>
                    <ModalBody>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Mã SV:</strong> {detailStudent.studentId}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Họ tên:</strong> {detailStudent.fullName}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Ngày sinh:</strong>{" "}
                            {new Date(detailStudent.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Giới tính:</strong> {detailStudent.gender}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Khoa:</strong> {detailStudent.faculty}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Khóa:</strong> {detailStudent.course}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Chương trình:</strong> {detailStudent.program}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Địa chỉ:</strong> {detailStudent.address}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Email:</strong> {detailStudent.email}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Số điện thoại:</strong> {detailStudent.phoneNumber}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <strong>Tình trạng:</strong> {detailStudent.studentStatus}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeDetailDialog}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
}

export default DisplayStudentPage;
