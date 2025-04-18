import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddCoursePage from "../pages/AddCoursePage";
import { MemoryRouter } from "react-router-dom";
import api from "../services/api";

// Mock API
vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("AddCoursePage", () => {
  it("gửi form thành công", async () => {
    // Giả lập phản hồi thành công từ API
    api.post.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AddCoursePage />
      </MemoryRouter>
    );

    // Thực hiện điền dữ liệu vào form
    fireEvent.change(screen.getByPlaceholderText("Mã khóa học"), {
      target: { value: "CS101" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tên môn học"), {
      target: { value: "Lập Trình Web" },
    });
    fireEvent.change(screen.getByPlaceholderText("Số tín chỉ"), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByPlaceholderText("Khoa"), {
      target: { value: "Công Nghệ Thông Tin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mô tả"), {
      target: { value: "Khóa học về lập trình web cơ bản" },
    });

    // Nhấn nút Thêm Khóa Học
    fireEvent.click(screen.getByRole("button", { name: /Thêm Khóa Học/i }));

    // Kiểm tra API được gọi
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    // Kiểm tra thông báo thành công
    expect(screen.getByText("Khóa học đã được thêm thành công!")).toBeInTheDocument();
  });

  it("gửi form thất bại", async () => {
    // Giả lập phản hồi lỗi từ API
    api.post.mockRejectedValue(new Error("Lỗi khi thêm khóa học"));

    render(
      <MemoryRouter>
        <AddCoursePage />
      </MemoryRouter>
    );

    // Điền dữ liệu vào form
    fireEvent.change(screen.getByPlaceholderText("Mã khóa học"), {
      target: { value: "CS102" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tên môn học"), {
      target: { value: "Lập Trình Frontend" },
    });

    // Nhấn nút Thêm Khóa Học
    fireEvent.click(screen.getByRole("button", { name: /Thêm Khóa Học/i }));

    // Kiểm tra API được gọi
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    // Kiểm tra thông báo lỗi
    expect(screen.getByText("Thêm khóa học thất bại. Vui lòng thử lại.")).toBeInTheDocument();
  });
});
