import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DisplayStudentPage from "../pages/DisplayStudentPage";
import api from "../services/api";
import { BrowserRouter } from "react-router-dom";
import { vi, it, expect, describe, beforeEach } from "vitest";

// Mock react-i18next đơn giản
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock API
vi.mock("../services/api");

// Dữ liệu mẫu
const mockStudents = [
  {
    studentId: "SV001",
    fullName: "Nguyễn Văn A",
    dateOfBirth: "2002-05-20T00:00:00.000Z",
    gender: "Male",
    course: "22",
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
    // Trả về danh sách sinh viên
    api.get.mockResolvedValue({ data: mockStudents });
  });

  it("render danh sách sinh viên", async () => {
    render(
      <BrowserRouter>
        <DisplayStudentPage />
      </BrowserRouter>
    );

    // Đợi dữ liệu hiển thị
    await waitFor(() => {
      expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
      expect(screen.getByText("SV001")).toBeInTheDocument();
      expect(screen.getByText("Công nghệ thông tin")).toBeInTheDocument();
    });
  });

  it("mở modal khi bấm nút 'detail'", async () => {
    render(
      <BrowserRouter>
        <DisplayStudentPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
    });

    const detailBtn = screen.getByText("detail");
    fireEvent.click(detailBtn);

    await waitFor(() => {
      expect(screen.getByText("student_details")).toBeInTheDocument();
      expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
      expect(screen.getByText("Đại trà")).toBeInTheDocument();
    });
  });
});
