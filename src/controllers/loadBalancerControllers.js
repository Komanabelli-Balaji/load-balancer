import { simulateTraffic } from "../services/trafficSimulator.js";

const trafficSimulatorController = (req, res) => {
  const requestCount = Number(req.query.count) || 5;
  const traffic = simulateTraffic(requestCount);

  res.status(200).json({
    totalRequests: requestCount,
    traffic,
  });
};

export { trafficSimulatorController };