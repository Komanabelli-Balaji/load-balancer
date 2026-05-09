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
      this.addNode(node);
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

  getNode(ip) {
    if (this.sortedHashes.length === 0) {
      return null;
    }

    const ipHash = generateHash(ip);

    for (const hash of this.sortedHashes) {
      if (ipHash <= hash) {
        return this.ring.get(hash);
      }
    }

    return this.ring.get(this.sortedHashes[0]);
  }
}