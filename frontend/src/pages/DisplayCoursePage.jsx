import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function DisplayCoursePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/courses");
            setCourses(res.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khóa học:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 py-6">
            <div className="mb-4 flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">Danh sách Khóa Học</h1>
                <Link
                    to="/add-course"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Thêm Khóa Học
                </Link>
            </div>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        {[
                            "Mã khóa học",
                            "Tên môn",
                            "Số tín chỉ",
                            "Khoa",
                            "Mô tả",
                            "Tiên quyết",
                        ].map((col) => (
                            <th key={col} className="py-2 px-4 border-b text-left">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{course.courseCode}</td>
                            <td className="py-2 px-4 border-b">{course.courseName}</td>
                            <td className="py-2 px-4 border-b">{course.creditHours}</td>
                            <td className="py-2 px-4 border-b">{course.department}</td>
                            <td className="py-2 px-4 border-b max-w-[250px] truncate">
                                {course.description}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {course.prerequisite || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayCoursePage;
