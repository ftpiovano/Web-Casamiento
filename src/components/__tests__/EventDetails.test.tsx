import { render, screen, getAllByText } from "@testing-library/react";
import { EventDetails } from "../EventDetails";
import { describe, it, expect } from "vitest";

describe("EventDetails", () => {
  it("renders argentina and brasil headings", () => {
    render(<EventDetails />);
    const argentinaElements = screen.getAllByText(/Argentina/i);
    const brasilElements = screen.getAllByText(/Brasil/i);
    
    expect(argentinaElements.length).toBeGreaterThan(0);
    expect(brasilElements.length).toBeGreaterThan(0);
  });
});
