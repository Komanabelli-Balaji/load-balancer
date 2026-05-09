import { describe, it, expect } from "vitest";
import { ConsistentHashRing } from "../services/consistentHashing.js";

describe("ConsistentHashRing", () => {
    const nodes = [
      {
        name: "Node-A",
        healthy: true,
        weight: 1,
      },
      {
        name: "Node-B",
        healthy: true,
        weight: 1,
      },
      {
        name: "Node-C",
        healthy: true,
        weight: 1,
      },
    ];

    const ring = new ConsistentHashRing(nodes);

    it("should route same IP to same node", () => {
        const first = ring.getNode("192.168.1.1", nodes);
        const second = ring.getNode("192.168.1.1", nodes);

        expect(first).toBe(second);
      }
    );

    it("should return healthy node only", () => {
        nodes[0].healthy = false;
        const node = ring.getNode("192.168.1.1", nodes);

        expect(node).not.toBe("Node-A");
        nodes[0].healthy = true;
      }
    );

    it("should return null if all unhealthy", () => {
        nodes.forEach(
          (node) => (node.healthy = false)
        );

        const result = ring.getNode("192.168.1.1", nodes);
        expect(result).toBe(null);

        nodes.forEach(
          (node) =>
            (node.healthy = true)
        );
      }
    );
  }
);