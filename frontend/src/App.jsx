import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import DisplayStudentPage from "./pages/DisplayStudentPage";
import AddStudentPage from "./pages/AddStudentPage";
import UpdateStudentPage from "./pages/UpdateStudentPage";
import ErrorPage from "./pages/ErrorPage";
import DisplayCoursePage from "./pages/DisplayCoursePage";
import AddCoursePage from "./pages/AddCoursePage";
import DisplayClassPage from "./pages/DisplayClassPage";
import AddClassPage from "./pages/AddClassPage";
import AddStudentToClassPage from "./pages/AddStudentToClassPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayStudentPage />} />
        <Route path="/create-student" element={<AddStudentPage />} />
        <Route path="/update-student" element={<UpdateStudentPage />} />
        <Route path="/courses" element={<DisplayCoursePage />} />
        <Route path="/add-course" element={<AddCoursePage />} />
        <Route path="/classes" element={<DisplayClassPage />} />
        <Route path="/add-class" element={<AddClassPage />} />
        <Route path="/add-student-to-class" element={<AddStudentToClassPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
