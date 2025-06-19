import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MyNavbar } from "./components/Navbar";
import { MySidebar } from "./components/SideBar";

import { ThemeConfig } from "flowbite-react";

import "./App.css";
import HomePage from "./pages/HomePage";
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
      <ThemeConfig dark={false} />
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <MyNavbar />
        </div>
        <div className="flex flex-1 pt-16 overflow-hidden">
          <div className="w-64 overflow-y-auto border-r">
            <MySidebar />
          </div>
          <div className="flex-1 overflow-x-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/students" element={<DisplayStudentPage />} />
              <Route path="/add-student" element={<AddStudentPage />} />
              <Route path="/update-student" element={<UpdateStudentPage />} />
              <Route path="/courses" element={<DisplayCoursePage />} />
              <Route path="/add-course" element={<AddCoursePage />} />
              <Route path="/classes" element={<DisplayClassPage />} />
              <Route path="/add-class" element={<AddClassPage />} />
              <Route
                path="/add-student-to-class"
                element={<AddStudentToClassPage />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
