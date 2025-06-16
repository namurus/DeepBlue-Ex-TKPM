import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateStudentPage from "../pages/CreateStudentPage";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("CreateStudentPage - simple test", () => {
  const alertMock = vi.fn();

  beforeEach(() => {
    window.alert = alertMock;
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({ success: true }),
    });
    alertMock.mockClear();
  });

  it("renders and submits form", async () => {
    render(<CreateStudentPage />);

    // Thay đổi input studentId
    const studentIdInput = screen.getByLabelText("createStudent.studentId");
    fireEvent.change(studentIdInput, { target: { value: "SV001" } });
    expect(studentIdInput.value).toBe("SV001");

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "createStudent.submit" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith("createStudent.success");
      expect(studentIdInput.value).toBe(""); // reset studentId sau submit
    });
  });
});