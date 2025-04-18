import { render, screen, waitFor } from "@testing-library/react";
import DisplayClassPage from "../pages/DisplayClassPage";
import { BrowserRouter } from "react-router-dom";
import api from "../services/api";
import { vi, describe, beforeEach, expect, it } from "vitest";

// ✅ Mock api
vi.mock("../services/api");

// ✅ Dữ liệu mẫu trả về từ API
const mockClasses = [
  {
    _id: "680214cfae46aa49323ff161",
    classCode: "CS101-A",
    courseCode: "CS101",
    academicYear: "2024-2025",
    semester: "Fall",
    lecturer: "Dr. John Doe",
    maxStudents: 50,
    schedule: "Monday & Wednesday, 9:00 AM - 10:30 AM",
    classroom: "Room 204, Building A",
  },
  {
    _id: "6802460176e5d97f1ad0cd2c",
    classCode: "CTT4",
    courseCode: "CSC00001",
    academicYear: "2024",
    semester: "2",
    lecturer: "Trần Duy Quang",
    maxStudents: 50,
    schedule: "Thứ 2",
    classroom: "E305",
  },
];

describe("DisplayClassPage", () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockClasses });
  });

  it("hiển thị danh sách lớp học từ API", async () => {
    render(
      <BrowserRouter>
        <DisplayClassPage />
      </BrowserRouter>
    );

    // Chờ dữ liệu được render
    await waitFor(() => {
      expect(screen.getByText("CS101-A")).toBeInTheDocument();
      expect(screen.getByText("CTT4")).toBeInTheDocument();
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
      expect(screen.getByText("Trần Duy Quang")).toBeInTheDocument();
    });

    // Kiểm tra tiêu đề và nút
    expect(screen.getByText("Danh sách Lớp Học")).toBeInTheDocument();
    expect(screen.getByText("Thêm Lớp Học")).toBeInTheDocument();
    expect(screen.getByText("Thêm Sinh Viên Vào Lớp")).toBeInTheDocument();
  });
});
