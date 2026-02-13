import { render, screen } from "@testing-library/react";
import { EventDetails } from "../EventDetails";
import { describe, it, expect } from "vitest";

describe("EventDetails", () => {
  it("renders ceremony and reception headings", () => {
    render(<EventDetails />);
    expect(screen.getByText(/Cerim/i)).toBeDefined();
    expect(screen.getByText(/Recep/i)).toBeDefined();
  });
});
