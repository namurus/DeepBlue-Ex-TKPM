import { render, screen, waitFor } from "@testing-library/react";
import DisplayClassPage from "../pages/DisplayClassPage";
import api from "../services/api";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock api module
vi.mock("../services/api");

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Dữ liệu giả lập cho classes
const mockClasses = [
  {
    _id: "1",
    classCode: "CS101",
    courseCode: "CS",
    academicYear: "2024",
    semester: "Spring",
    lecturer: "Nguyen Van A",
    maxStudents: 30,
    schedule: "Mon 8-10",
    classroom: "Room 101",
  },
  {
    _id: "2",
    classCode: "MATH201",
    courseCode: "Math",
    academicYear: "2024",
    semester: "Fall",
    lecturer: "Tran Thi B",
    maxStudents: 25,
    schedule: "Wed 10-12",
    classroom: "Room 202",
  },
];

describe("DisplayClassPage", () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockClasses });
  });

  it("renders class table with mock data", async () => {
    render(<DisplayClassPage />);

    // Đợi dữ liệu load lên
    await waitFor(() => {
      // Kiểm tra tiêu đề
      expect(screen.getByText("displayClass.title")).toBeInTheDocument();

      // Kiểm tra header các cột
      expect(screen.getByText("displayClass.columns.classCode")).toBeInTheDocument();
      expect(screen.getByText("displayClass.columns.courseCode")).toBeInTheDocument();

      // Kiểm tra dữ liệu trong bảng
      expect(screen.getByText("CS101")).toBeInTheDocument();
      expect(screen.getByText("Nguyen Van A")).toBeInTheDocument();

      expect(screen.getByText("MATH201")).toBeInTheDocument();
      expect(screen.getByText("Room 202")).toBeInTheDocument();
    });
  });
});
