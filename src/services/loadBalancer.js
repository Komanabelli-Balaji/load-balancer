import { nodes } from "../config/nodes.js";
import { ConsistentHashRing } from "./consistentHashing.js";

const hashRing = new ConsistentHashRing(nodes);

export const routeRequest = (ip) => {
  const selectedNode = hashRing.getNode(ip);
  logRequest(ip, selectedNode);

  return selectedNode;
}

export const addNewNode = (node) => {
  nodes.push(node);
  hashRing.addNode(node);
}

export const removeExistingNode = (node) => {
  const index = nodes.indexOf(node);

  if (index !== -1) {
    nodes.splice(index, 1);
    hashRing.removeNode(node);
  }
}