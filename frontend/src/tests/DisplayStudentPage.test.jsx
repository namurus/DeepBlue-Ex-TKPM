import { render, screen, waitFor } from "@testing-library/react";
import DisplayStudentPage from "../pages/DisplayStudentPage";
import api from "../services/api";
import { BrowserRouter } from "react-router-dom";
import { vi, it, expect, describe, beforeEach } from "vitest";

// ✅ Mock module api
vi.mock("../services/api");

// ✅ Data mẫu bạn đã đưa
const mockStudents = [
  {
    studentId: "22120223",
    fullName: "Thái Đình Ngân",
    dateOfBirth: "2003-10-01T00:00:00.000Z",
    gender: "Male",
    course: "22",
    email: "thaidinhngan@student.university.edu.vn",
    phoneNumber: "0945335846",
    faculty: "Công nghệ sinh học",
    program: "Đại trà",
    address: "173 NVC",
    studentStatus: "Đang học",
  },
  {
    studentId: "22120222",
    fullName: "Võ Văn Nam",
    dateOfBirth: "2004-10-01T00:00:00.000Z",
    gender: "Male",
    course: "22",
    email: "vovannam04@student.university.edu.vn",
    phoneNumber: "+84439854",
    faculty: "CNTT",
    program: "Đại trà",
    address: "Gia Lai",
    studentStatus: "Đang học",
  },
  {
    studentId: "SV001",
    fullName: "Nguyễn Văn A",
    dateOfBirth: "2002-05-20T00:00:00.000Z",
    gender: "Male",
    course: "Computer Science",
    email: "nguyenvana@student.university.edu.vn",
    phoneNumber: "0987654321",
    faculty: "Công nghệ thông tin",
    program: "Đại trà",
    address: "123 Nguyễn Văn Cừ",
    studentStatus: "Đang học",
  },
];

describe("DisplayStudentPage", () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockStudents });
  });

  it("renders student table with mock data", async () => {
    render(
      <BrowserRouter>
        <DisplayStudentPage />
      </BrowserRouter>
    );

    // Chờ dữ liệu render
    await waitFor(() => {
      expect(screen.getByText("Thái Đình Ngân")).toBeInTheDocument();
      expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
    });

    // Kiểm tra tiêu đề
    expect(screen.getByText("Danh sách sinh viên")).toBeInTheDocument();

    // Kiểm tra nút thêm sinh viên
    expect(screen.getByText("Thêm Sinh Viên")).toBeInTheDocument();
  });
});
