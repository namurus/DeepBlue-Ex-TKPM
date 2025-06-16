import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddClassPage from "../pages/AddClassPage";
import { vi, describe, it, expect } from "vitest";

// Mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock API
vi.mock("../services/api", () => ({
  default: { post: vi.fn() },
}));

import api from "../services/api";

describe("AddClassPage", () => {
  it("renders form and submits successfully", async () => {
    api.default.post.mockResolvedValueOnce({}); // giả lập thành công

    render(<AddClassPage />);

    fireEvent.change(screen.getByLabelText("addClass.labels.classCode"), {
      target: { value: "CL001" },
    });
    fireEvent.change(screen.getByLabelText("addClass.labels.maxStudents"), {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByRole("button", { name: "addClass.submit" }));

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalled();
    });
  });
});
