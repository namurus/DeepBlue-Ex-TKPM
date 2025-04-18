import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCoursePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    creditHours: 0,
    department: "",
    description: "",
    prerequisite: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      creditHours: Number(form.creditHours),
      prerequisite: form.prerequisite || null,
    };

    try {
      await api.post("/courses", payload);
      setSuccess("Khóa học đã được thêm thành công!");
      setTimeout(() => navigate("/courses"), 1500); // Redirect sau 1.5s
    } catch (err) {
      console.error("Lỗi khi thêm khóa học:", err);
      setError("Thêm khóa học thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Thêm Khóa Học
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <Input label="Mã khóa học" name="courseCode" value={form.courseCode} onChange={handleChange} required />
            <Input label="Tên môn học" name="courseName" value={form.courseName} onChange={handleChange} required />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Số tín chỉ"
              name="creditHours"
              value={form.creditHours}
              onChange={handleChange}
              type="number"
              required
            />
            <Input label="Khoa" name="department" value={form.department} onChange={handleChange} required />
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Nhập mô tả khóa học"
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Tiên quyết (nếu có)</label>
            <input
              name="prerequisite"
              value={form.prerequisite}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập môn học tiên quyết (nếu có)"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Thêm Khóa Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Subcomponent for Input
function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={label}
      />
    </div>
  );
}

export default AddCoursePage;
