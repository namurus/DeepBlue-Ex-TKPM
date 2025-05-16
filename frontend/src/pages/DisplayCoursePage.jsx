import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";

function DisplayCoursePage() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data || []);
    } catch (error) {
      console.error(t("displayCourse.fetchError"), error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">{t("displayCourse.title")}</h1>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            {[
              "courseCode",
              "courseName",
              "creditHours",
              "department",
              "description",
              "prerequisite",
            ].map((col) => (
              <th key={col} className="py-2 px-4 border-b text-left">
                {t(`displayCourse.columns.${col}`)}
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
              <td className="py-2 px-4 border-b">{course.prerequisite || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayCoursePage;
