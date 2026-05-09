import { describe, it, expect } from "vitest";
import { ConsistentHashRing } from "../services/consistentHashing.js";

describe("Weighted Routing", () => {
    it("higher weight nodes should receive more traffic", () => {
        const nodes = [
          {
            name: "Node-A",
            healthy: true,
            weight: 5,
          },
          {
            name: "Node-B",
            healthy: true,
            weight: 1,
          },
        ];

        const ring = new ConsistentHashRing(nodes);

        const counts = {
          "Node-A": 0,
          "Node-B": 0,
        };

        for (let i = 0; i < 5000; i++) {
          const ip = `192.168.1.${i}`;
          const node = ring.getNode(ip, nodes);

          counts[node]++;
        }

        expect(
          counts["Node-A"]
        ).toBeGreaterThan(
          counts["Node-B"]
        );
      }
    );
  }
);