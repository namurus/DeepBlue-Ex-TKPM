import React, { useState } from "react";

function CreateStudentPage() {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    dateOfBirth: "",
    gender: "Male",
    course: "",
    program: "",
    faculty: "",
    studentStatus: "Đang học",
    identityNumber: "",
    identityIssuedPlace: "",
    identityIssuedDate: "",
    identityExpiryDate: "",
    email: "",
    phoneNumber: "",
    permanentAddress: "",
    currentAddress: "",
    mailingAddress: "",
    nationality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5134/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Thêm sinh viên thành công!");
        setFormData({ ...formData, studentId: "" });
      } else {
        alert(result.message || "Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối đến máy chủ.");
    }
  };

  const courseOptions = Array.from({ length: 8 }, (_, i) => 17 + i);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Thông tin sinh viên
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Mã số sinh viên" name="studentId" value={formData.studentId} onChange={handleChange} required />
            <Input label="Họ tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label="Ngày sinh" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <Select label="Giới tính" name="gender" value={formData.gender} onChange={handleChange} options={[{ label: "Nam", value: "Male" }, { label: "Nữ", value: "Female" }]} />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Khóa"
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courseOptions.map((k) => ({ label: `Khóa ${k}`, value: k }))}
              placeholder="Chọn khóa"
            />
            <Input label="Chương trình" name="program" value={formData.program} onChange={handleChange} required />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Khoa" name="faculty" value={formData.faculty} onChange={handleChange} required />
            <Select
              label="Tình trạng sinh viên"
              name="studentStatus"
              value={formData.studentStatus}
              onChange={handleChange}
              options={[
                { label: "Đang học", value: "Đang học" },
                { label: "Đã tốt nghiệp", value: "Đã tốt nghiệp" },
                { label: "Đã thôi học", value: "Đã thôi học" },
                { label: "Tạm dừng học", value: "Tạm dừng học" },
              ]}
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Thông tin CCCD</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Số CCCD" name="identityNumber" value={formData.identityNumber} onChange={handleChange} required />
            <Input label="Nơi cấp" name="identityIssuedPlace" value={formData.identityIssuedPlace} onChange={handleChange} required />
            <Input type="date" label="Ngày cấp" name="identityIssuedDate" value={formData.identityIssuedDate} onChange={handleChange} required />
            <Input type="date" label="Ngày hết hạn" name="identityExpiryDate" value={formData.identityExpiryDate} onChange={handleChange} required />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Thông tin liên hệ</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
            <Input label="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Địa chỉ</h3>
          <Input label="Địa chỉ thường trú" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
          <Input label="Địa chỉ hiện tại" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
          <Input label="Địa chỉ liên hệ" name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} required />
          <Input label="Quốc tịch" name="nationality" value={formData.nationality} onChange={handleChange} required />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
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

function Select({ label, name, value, onChange, options = [], placeholder = "" }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default CreateStudentPage;