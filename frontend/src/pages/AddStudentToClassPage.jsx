import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

function AddStudentToClassPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    classCode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/class-students", form);
      setSuccess(t("addStudentToClass.success"));
      setTimeout(() => navigate("/classes"), 1500);
    } catch (err) {
      console.error(t("addStudentToClass.error"), err);
      setError(t("addStudentToClass.error"));
    }
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="mb-4 flex justify-center items-center px-4">
        <h1 className="text-2xl font-bold">{t("addStudentToClass.title")}</h1>
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t("addStudentToClass.labels.studentId")}
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          />
          <Input
            label={t("addStudentToClass.labels.classCode")}
            name="classCode"
            value={form.classCode}
            onChange={handleChange}
            required
          />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              {t("addStudentToClass.submit")}
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

export default AddStudentToClassPage;
