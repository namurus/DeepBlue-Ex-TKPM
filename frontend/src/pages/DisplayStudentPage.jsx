import { useState, useEffect } from "react";
import api from "../services/api.js";

function DisplayStudentPage() {
    const [dataTable, setDataTable] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [detailStudent, setDetailStudent] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await api.get("/get-student");
            setDataTable(res.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await api.get(`/get-student?studentId=${searchId}`);
            setDataTable(res.data ? [res.data] : []);
        } catch (error) {
            console.error("Không tìm thấy sinh viên", error);
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
            <div className="mb-4 flex justify-between items-center px-4">
                <a href="/create-student" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-1/3 text-center">
                    Thêm Sinh Viên
                </a>

                <form onSubmit={handleSearch} className="w-1/3 flex ml-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã sinh viên"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="border p-2 rounded-l w-full mr-1"
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-700">
                        Tìm
                    </button>
                </form>
            </div>

            <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        {["Mã SV", "Họ tên", "Ngày sinh", "Giới tính", "Khoa", "Khóa", "Chương trình", "Địa chỉ", "Email", "Số điện thoại", "Tình trạng", "Hành động"].map((col) => (
                            <th key={col} className="py-2 px-4 border-b">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((student) => (
                        <tr key={student.studentId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{student.studentId}</td>
                            <td className="py-2 px-4 border-b">{student.fullName}</td>
                            <td className="py-2 px-4 border-b">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{student.gender}</td>
                            <td className="py-2 px-4 border-b">{student.faculty}</td>
                            <td className="py-2 px-4 border-b">{student.course}</td>
                            <td className="py-2 px-4 border-b">{student.program}</td>
                            <td className="py-2 px-4 border-b">{student.address}</td>
                            <td className="py-2 px-4 border-b">{student.email}</td>
                            <td className="py-2 px-4 border-b">{student.phoneNumber}</td>
                            <td className="py-2 px-4 border-b">{student.studentStatus}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => showStudentDetails(student)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDetail && detailStudent && (
                <div className="flex fixed inset-0 bg-gray-800 bg-opacity-50 justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold mb-4">Chi tiết sinh viên</h2>
                        <p><strong>Mã SV:</strong> {detailStudent.studentId}</p>
                        <p><strong>Họ tên:</strong> {detailStudent.fullName}</p>
                        <p><strong>Ngày sinh:</strong> {new Date(detailStudent.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Giới tính:</strong> {detailStudent.gender}</p>
                        <p><strong>Khoa:</strong> {detailStudent.faculty}</p>
                        <p><strong>Khóa:</strong> {detailStudent.course}</p>
                        <p><strong>Chương trình:</strong> {detailStudent.program}</p>
                        <p><strong>Địa chỉ:</strong> {detailStudent.address}</p>
                        <p><strong>Email:</strong> {detailStudent.email}</p>
                        <p><strong>Số điện thoại:</strong> {detailStudent.phoneNumber}</p>
                        <p><strong>Tình trạng:</strong> {detailStudent.studentStatus}</p>
                        {/* Có thể bổ sung chi tiết địa chỉ/thẻ nếu cần */}
                        <div className="text-right mt-4">
                            <button onClick={closeDetailDialog} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisplayStudentPage;
