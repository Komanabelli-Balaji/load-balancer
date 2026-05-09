import { describe, it, expect } from "vitest";
import { ConsistentHashRing } from "../services/consistentHashing.js";

describe("ConsistentHashRing", () => {
  const ring = new ConsistentHashRing([
    "Node-A",
    "Node-B",
    "Node-C",
  ]);

  it("should always route same IP to same node", () => {
    const first = ring.getNode("192.168.1.1");
    const second = ring.getNode("192.168.1.1");

    expect(first).toBe(second);
  });

  it("should return a valid node", () => {
    const node = ring.getNode("10.0.0.1");

    expect([
      "Node-A",
      "Node-B",
      "Node-C",
    ]).toContain(node);
  });

  it("should still work after adding a node", () => {
    ring.addNode("Node-D");

    const node = ring.getNode("192.168.1.1");

    expect([
      "Node-A",
      "Node-B",
      "Node-C",
      "Node-D",
    ]).toContain(node);
  });
});