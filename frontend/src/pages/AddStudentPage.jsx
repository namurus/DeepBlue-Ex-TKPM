import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function CreateStudentPage() {
  const { t } = useTranslation();

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
        alert(t("createStudent.success"));
        setFormData({ ...formData, studentId: "" });
      } else {
        alert(result.message || t("createStudent.error"));
      }
    } catch (error) {
      console.error(error);
      alert(t("createStudent.serverError"));
    }
  };

  const courseOptions = Array.from({ length: 8 }, (_, i) => 17 + i);

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-center items-center px-4">
        <h1 className="text-2xl font-bold">{t("createStudent.title")}</h1>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label={t("createStudent.studentId")} name="studentId" value={formData.studentId} onChange={handleChange} required />
            <Input label={t("createStudent.fullName")} name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label={t("createStudent.dateOfBirth")} name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <Select
              label={t("createStudent.gender")}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: t("createStudent.male"), value: "Male" },
                { label: t("createStudent.female"), value: "Female" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label={t("createStudent.course")}
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courseOptions.map((k) => ({ label: `${t("createStudent.course")} ${k}`, value: k }))}
              placeholder={t("createStudent.selectCourse")}
            />
            <Input label={t("createStudent.program")} name="program" value={formData.program} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label={t("createStudent.faculty")} name="faculty" value={formData.faculty} onChange={handleChange} required />
            <Select
              label={t("createStudent.studentStatus")}
              name="studentStatus"
              value={formData.studentStatus}
              onChange={handleChange}
              options={[
                { label: t("createStudent.statusStudying"), value: "Đang học" },
                { label: t("createStudent.statusGraduated"), value: "Đã tốt nghiệp" },
                { label: t("createStudent.statusDropped"), value: "Đã thôi học" },
                { label: t("createStudent.statusPaused"), value: "Tạm dừng học" },
              ]}
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">{t("createStudent.identityInfo")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t("createStudent.identityNumber")} name="identityNumber" value={formData.identityNumber} onChange={handleChange} required />
            <Input label={t("createStudent.identityIssuedPlace")} name="identityIssuedPlace" value={formData.identityIssuedPlace} onChange={handleChange} required />
            <Input type="date" label={t("createStudent.identityIssuedDate")} name="identityIssuedDate" value={formData.identityIssuedDate} onChange={handleChange} required />
            <Input type="date" label={t("createStudent.identityExpiryDate")} name="identityExpiryDate" value={formData.identityExpiryDate} onChange={handleChange} required />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">{t("createStudent.contactInfo")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input type="email" label={t("createStudent.email")} name="email" value={formData.email} onChange={handleChange} required />
            <Input label={t("createStudent.phoneNumber")} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">{t("createStudent.addressInfo")}</h3>
          <Input label={t("createStudent.permanentAddress")} name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
          <Input label={t("createStudent.currentAddress")} name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
          <Input label={t("createStudent.mailingAddress")} name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} required />
          <Input label={t("createStudent.nationality")} name="nationality" value={formData.nationality} onChange={handleChange} required />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              {t("createStudent.submit")}
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
