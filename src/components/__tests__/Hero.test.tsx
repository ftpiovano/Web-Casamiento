import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";
import { describe, it, expect, vi } from "vitest";
import { siteConfig } from "@/site.config";

describe("Hero", () => {
  it("renders names from config", () => {
    render(<Hero />);
    expect(screen.getByText(new RegExp(siteConfig.names.bride, "i"))).toBeDefined();
    expect(screen.getByText(new RegExp(siteConfig.names.groom, "i"))).toBeDefined();
  });
});
