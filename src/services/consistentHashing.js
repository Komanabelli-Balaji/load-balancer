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
      this.addNode(node.name, node.weight);
    }
  }

  addNode(node, weight = 1) {
    const replicaCount = VIRTUAL_NODE_COUNT * weight;

    for (let i = 0; i < replicaCount; i++) {
      const virtualNodeKey = `${node}#${i}`;
      const hash = generateHash(virtualNodeKey);

      this.ring.set(hash, node);
      this.sortedHashes.push(hash);
    }

    this.sortedHashes.sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    );
  }

  removeNode(nodeToRemove, weight = 1) {
    const hashesToRemove = [];
    const replicaCount = VIRTUAL_NODE_COUNT * weight;

    for (let i = 0; i < replicaCount; i++) {
      const virtualNodeKey = `${nodeToRemove}#${i}`;
      const hash = generateHash(virtualNodeKey);

      this.ring.delete(hash);
      hashesToRemove.push(hash);
    }

    const removeSet = new Set(hashesToRemove);

    this.sortedHashes =
      this.sortedHashes.filter(
        (hash) => !removeSet.has(hash)
      );
  }

  getNode(ip, nodes) {
    if (this.sortedHashes.length === 0) {
      return null;
    }

    const ipHash = generateHash(ip);
    const startIndex = this.findNearestHashIndex(ipHash);

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

  findNearestHashIndex(targetHash) {
    let left = 0;
    let right = this.sortedHashes.length - 1;

    let result = -1;

    while (left <= right) {
      const mid = Math.floor(
        (left + right) / 2
      );

      if (this.sortedHashes[mid] >= targetHash) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result === -1 ? 0 : result;
  }
}