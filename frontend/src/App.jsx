import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import DisplayStudentPage from "./pages/DisplayStudentPage";
import AddStudentPage from "./pages/AddStudentPage";
import UpdateStudentPage from "./pages/UpdateStudentPage";
import ErrorPage from "./pages/ErrorPage";
import DisplayCoursePage from "./pages/DisplayCoursePage";
import AddCoursePage from "./pages/AddCoursePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayStudentPage />} />
        <Route path="/create-student" element={<AddStudentPage />} />
        <Route path="/update-student" element={<UpdateStudentPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/courses" element={<DisplayCoursePage />} />
        <Route path="/add-course" element={<AddCoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
