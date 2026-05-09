import { nodes } from "../config/nodes.js";
import { ConsistentHashRing } from "./consistentHashing.js";
import { logRequest } from "./logger.js";

const hashRing = new ConsistentHashRing(nodes);

export const routeRequest = (ip) => {
  const selectedNode = hashRing.getNode(ip);
  logRequest(ip, selectedNode);

  return selectedNode;
}

export const addNewNode = (node) => {
  if (nodes.includes(node)) {
    return {
      success: false,
      message: "Node already exists",
    };
  }

  nodes.push(node);
  hashRing.addNode(node);

  return {
    success: true,
    message: `${node} added successfully`,
  };
}

export const removeExistingNode = (node) => {
  const index = nodes.indexOf(node);

  if (index === -1) {
    return {
      success: false,
      message: "Node does not exist",
    };
  }

  nodes.splice(index, 1);
  hashRing.removeNode(node);

  return {
    success: true,
    message: `${node} removed successfully`,
  };
}

export const getAllNodes = () => {
  return [...nodes];
}