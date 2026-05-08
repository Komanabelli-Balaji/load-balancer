import { describe, it, expect } from "vitest";
import { generateHash } from "../utils/hash.js";

describe("generateHash", () => {
  it("should generate same hash for same input", () => {
    const hash1 = generateHash("192.168.1.1");
    const hash2 = generateHash("192.168.1.1");

    expect(hash1).toBe(hash2);
  });

  it("should generate different hashes for different inputs", () => {
    const hash1 = generateHash("192.168.1.1");
    const hash2 = generateHash("192.168.1.2");

    expect(hash1).not.toBe(hash2);
  });
});