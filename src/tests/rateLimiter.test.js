import { describe, it, expect } from "vitest";
import { isRateLimited } from "../services/rateLimiter.js";

describe("Rate Limiter", () => {
    it("should block excessive requests", () => {
        const ip = "192.168.1.1";
        let blocked = false;

        for (let i = 0; i < 25; i++) {
          blocked = isRateLimited(ip);
        }

        expect(blocked).toBe(true);
      }
    );
  }
);