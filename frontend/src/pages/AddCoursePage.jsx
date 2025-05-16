import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

function AddCoursePage() {
  const { t } = useTranslation();
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
      setSuccess(t("addCourse.success"));
      setError("");
      setTimeout(() => navigate("/courses"), 1500);
    } catch (err) {
      console.error(t("addCourse.error"), err);
      setError(t("addCourse.error"));
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-center items-center px-4">
        <h1 className="text-2xl font-bold">{t("addCourse.title")}</h1>
      </div>
      <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Input label={t("addCourse.courseCode")} name="courseCode" value={form.courseCode} onChange={handleChange} required />
            <Input label={t("addCourse.courseName")} name="courseName" value={form.courseName} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label={t("addCourse.creditHours")}
              name="creditHours"
              value={form.creditHours}
              onChange={handleChange}
              type="number"
              required
            />
            <Input label={t("addCourse.department")} name="department" value={form.department} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{t("addCourse.description")}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder={t("addCourse.descriptionPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{t("addCourse.prerequisite")}</label>
            <input
              name="prerequisite"
              value={form.prerequisite}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={t("addCourse.prerequisitePlaceholder")}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              {t("addCourse.submit")}
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
