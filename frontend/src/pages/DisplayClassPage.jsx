import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function DisplayClassPage() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClasses(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lớp học:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Danh sách Lớp Học</h1>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            {[
              "Mã lớp",
              "Mã môn học",
              "Năm học",
              "Học kỳ",
              "Giảng viên",
              "Số SV tối đa",
              "Lịch học",
              "Phòng học",
            ].map((col) => (
              <th key={col} className="py-2 px-4 border-b text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{cls.classCode}</td>
              <td className="py-2 px-4 border-b">{cls.courseCode}</td>
              <td className="py-2 px-4 border-b">{cls.academicYear}</td>
              <td className="py-2 px-4 border-b">{cls.semester}</td>
              <td className="py-2 px-4 border-b">{cls.lecturer}</td>
              <td className="py-2 px-4 border-b">{cls.maxStudents}</td>
              <td className="py-2 px-4 border-b">
                {cls.schedule}
              </td>
              <td className="py-2 px-4 border-b">{cls.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayClassPage;
