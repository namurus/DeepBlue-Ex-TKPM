import { render, screen, waitFor } from "@testing-library/react";
import DisplayCoursePage from "../pages/DisplayCoursePage";
import { BrowserRouter } from "react-router-dom";
import api from "../services/api";
import { vi, describe, it, expect, beforeEach } from "vitest";

// ✅ Mock API
vi.mock("../services/api");

// ✅ Dữ liệu giả
const mockCourses = [
  {
    _id: "6801f9ce0a30336aca8004f6",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    creditHours: 3,
    department: "Computer Science",
    description:
      "This course introduces the basics of computer science, including algorithms, data structures, and programming concepts.",
    prerequisite: null,
  },
];

describe("DisplayCoursePage", () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockCourses });
  });

  it("hiển thị danh sách khóa học từ API", async () => {
    render(
      <BrowserRouter>
        <DisplayCoursePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("CS101")).toBeInTheDocument();
      expect(
        screen.getByText("Introduction to Computer Science")
      ).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("Computer Science")).toBeInTheDocument();
      expect(
        screen.getByText(
          /This course introduces the basics of computer science/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText("-")).toBeInTheDocument(); // prerequisite null
    });

    // Kiểm tra tiêu đề và nút
    expect(screen.getByText("Danh sách Khóa Học")).toBeInTheDocument();
    expect(screen.getByText("Thêm Khóa Học")).toBeInTheDocument();
  });
});
