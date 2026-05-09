import { generateHash } from "../utils/hash.js";

const VIRTUAL_NODE_COUNT = process.env.VIRTUAL_NODE_COUNT || 100;

export class ConsistentHashRing {
  constructor(nodes = []) {
    this.ring = new Map();
    this.sortedHashes = [];

    this.buildRing(nodes);
  }

  buildRing(nodes) {
    for (const node of nodes) {
      this.addNode(node.name);
    }
  }

  addNode(node) {
    for (let i = 0; i < VIRTUAL_NODE_COUNT; i++) {
      const virtualNodeKey = `${node}#${i}`;
      const hash = generateHash(virtualNodeKey);

      this.ring.set(hash, node);
      this.sortedHashes.push(hash);
    }

    this.sortedHashes.sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    );
  }

  removeNode(nodeToRemove) {
    for (let i = 0; i < VIRTUAL_NODE_COUNT; i++) {
      const virtualNodeKey = `${nodeToRemove}#${i}`;
      const hash = generateHash(virtualNodeKey);

      this.ring.delete(hash);

      this.sortedHashes = this.sortedHashes.filter(
        (value) => value !== hash
      );
    }
  }

  getNode(ip, nodes) {
    if (this.sortedHashes.length === 0) {
      return null;
    }

    const ipHash = generateHash(ip);
    let startIndex = -1;

    for (let i = 0; i < this.sortedHashes.length; i++) {
      if (ipHash <= this.sortedHashes[i]) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) {
      startIndex = 0;
    }

    const visitedNodes = new Set();

    for (let i = 0; i < this.sortedHashes.length; i++) {
      const index = (startIndex + i) % this.sortedHashes.length;
      const hash = this.sortedHashes[index];
      const nodeName = this.ring.get(hash);

      if (visitedNodes.has(nodeName)) {
        continue;
      }

      visitedNodes.add(nodeName);

      const nodeData = nodes.find(
        (node) => node.name === nodeName
      );

      if (nodeData?.healthy) {
        return nodeName;
      }
    }

    return null;
  }
}