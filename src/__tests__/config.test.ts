import { siteConfig } from "@/site.config";
import { describe, it, expect } from "vitest";

describe("siteConfig", () => {
  it("should have wedding details", () => {
    expect(siteConfig.names).toBeDefined();
    expect(siteConfig.eventDate).toBeDefined();
    expect(siteConfig.theme).toBeDefined();
  });
});
