import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddStudentToClassPage from "../pages/AddStudentToClassPage";
import { MemoryRouter } from "react-router-dom";
import api from "../services/api";

// Mock API
vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("AddStudentToClassPage", () => {
  it("gửi form thành công", async () => {
    api.post.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AddStudentToClassPage />
      </MemoryRouter>
    );

    // Sử dụng getByPlaceholderText thay vì getByLabelText
    fireEvent.change(screen.getByPlaceholderText("Mã số sinh viên"), {
      target: { value: "22120223" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mã lớp học"), {
      target: { value: "CS101-A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Thêm Sinh Viên/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });
  });
});
