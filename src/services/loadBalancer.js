import { nodes } from "../config/nodes.js";
import { ConsistentHashRing } from "./consistentHashing.js";
import { logRequest } from "./logger.js";
import { incrementNodeMetric } from "./metrics.js";

const hashRing = new ConsistentHashRing(nodes);

const getHealthyNodes = () => {
  return nodes.filter((node) => node.healthy);
}

export const routeRequest = (ip) => {
  const selectedNode = hashRing.getNode(ip, nodes);

  if (!selectedNode) {
    return null;
  }

  incrementNodeMetric(selectedNode);
  logRequest(ip, selectedNode);
  
  return selectedNode;
}

export const addNewNode = (nodeName, weight = 1) => {
  const exists = nodes.some(
    (node) => node.name === nodeName
  );

  if (exists) {
    return {
      success: false,
      message: "Node already exists",
    };
  }

  const newNode = {
    name: nodeName,
    healthy: true,
    weight,
  };

  nodes.push(newNode);
  hashRing.addNode(nodeName, weight);

  return {
    success: true,
    message: `${nodeName} added successfully`,
  };
}

export const removeExistingNode = (nodeName) => {
  const index = nodes.findIndex(
    (node) => node.name === nodeName
  );

  if (index === -1) {
    return {
      success: false,
      message: "Node does not exist",
    };
  }

  nodes.splice(index, 1);
  hashRing.removeNode(nodeName);

  return {
    success: true,
    message: `${nodeName} removed successfully`,
  };
}

export const updateNodeHealth = (nodeName, healthy) => {
  const node = nodes.find(
    (node) => node.name === nodeName
  );

  if (!node) {
    return {
      success: false,
      message: "Node not found",
    };
  }

  node.healthy = healthy;

  return {
    success: true,
    message: `${nodeName} health updated`,
  };
}

export const getAllNodes = () => {
  return [...nodes];
}