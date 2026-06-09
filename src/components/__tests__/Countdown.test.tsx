import { render, screen } from "../../test/test-utils";
import { Countdown } from "../Countdown";
import { describe, it, expect } from "vitest";

describe("Countdown", () => {
  it("renders countdown labels", () => {
    render(<Countdown />);
    expect(screen.getByText(/Dias/i)).toBeDefined();
    expect(screen.getByText(/Horas/i)).toBeDefined();
    expect(screen.getByText(/Minutos/i)).toBeDefined();
    expect(screen.getByText(/Segundos/i)).toBeDefined();
  });
});
