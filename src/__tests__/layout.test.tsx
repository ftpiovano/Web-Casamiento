import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";
import { expect, it, describe, vi } from "vitest";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Playfair_Display: () => ({
    variable: "--font-playfair",
  }),
  Inter: () => ({
    variable: "--font-inter",
  }),
}));

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(getByText("Test Content")).toBeDefined();
  });
});
