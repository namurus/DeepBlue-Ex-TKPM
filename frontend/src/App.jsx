import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import DisplayStudentPage from "./pages/DisplayStudentPage";
import CreateStudentPage from "./pages/CreateStudentPage";
import UpdateStudentPage from "./pages/UpdateStudentPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayStudentPage />} />
        <Route path="/create-student" element={<CreateStudentPage />} />
        <Route path="/update-student" element={<UpdateStudentPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
