import { simulateTraffic } from "../services/trafficSimulator.js";
import {
  addNewNode,
  removeExistingNode,
  getAllNodes,
  updateNodeHealth,
} from "../services/loadBalancer.js";

export const trafficSimulatorController = (req, res) => {
  const requestCount = Number(req.query.count) || 5;
  const traffic = simulateTraffic(requestCount);

  res.status(200).json({
    totalRequests: requestCount,
    traffic,
  });
};

export const getAllNodesController = (req, res) => {
  res.status(200).json({
    nodes: getAllNodes(),
  });
};

export const addNodeController = (req, res) => {
  const { node } = req.body;

  if (!node) {
    return res.status(400).json({
      message: "Node name is required",
    });
  }

  const result = addNewNode(node);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
};

export const deleteNodeController = (req, res) => {
  const { node } = req.params;
  const result = removeExistingNode(node);

  if (!result.success) {
    return res.status(404).json(result);
  }

  res.status(200).json(result);
};

export const updateNodeHealthController = (req, res) => {
  const { node } = req.params;
  const { healthy } = req.body;

  if (typeof healthy !== "boolean") {
    return res.status(400).json({
      message: "healthy must be boolean",
    });
  }

  const result = updateNodeHealth(
    node,
    healthy
  );

  if (!result.success) {
    return res.status(404).json(result);
  }

  res.status(200).json(result);
};