import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

function AddClassPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    classCode: "",
    courseCode: "",
    academicYear: "",
    semester: "",
    lecturer: "",
    maxStudents: 0,
    schedule: "",
    classroom: "",
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
      maxStudents: Number(form.maxStudents),
    };

    try {
      await api.post("/classes", payload);
      setSuccess(t("addClass.success"));
      setTimeout(() => navigate("/classes"), 1500);
    } catch (err) {
      console.error(t("addClass.error"), err);
      setError(t("addClass.error"));
    }
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-center items-center px-4">
        <h1 className="text-2xl font-bold">{t("addClass.title")}</h1>
      </div>
      <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label={t("addClass.labels.classCode")}
              name="classCode"
              value={form.classCode}
              onChange={handleChange}
              required
            />
            <Input
              label={t("addClass.labels.courseCode")}
              name="courseCode"
              value={form.courseCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label={t("addClass.labels.academicYear")}
              name="academicYear"
              value={form.academicYear}
              onChange={handleChange}
              required
            />
            <Input
              label={t("addClass.labels.semester")}
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label={t("addClass.labels.lecturer")}
              name="lecturer"
              value={form.lecturer}
              onChange={handleChange}
              required
            />
            <Input
              label={t("addClass.labels.maxStudents")}
              name="maxStudents"
              value={form.maxStudents}
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          {/* Row 4 */}
          <Input
            label={t("addClass.labels.schedule")}
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            required
          />
          <Input
            label={t("addClass.labels.classroom")}
            name="classroom"
            value={form.classroom}
            onChange={handleChange}
            required
          />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              {t("addClass.submit")}
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
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left"
        htmlFor={name}
      >
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

export default AddClassPage;
