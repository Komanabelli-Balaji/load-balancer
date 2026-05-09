import { generateRandomIP } from "../utils/generateRandomIP.js";
import { routeRequest } from "./loadBalancer.js";

const simulateTraffic = (requestCount = 5) => {
  const traffic = [];

  for (let i = 0; i < requestCount; i++) {
    const ip = generateRandomIP();
    const routedNode = routeRequest(ip) || "NO_HEALTHY_NODE";

    traffic.push({
      requestNumber: i + 1,
      ip,
      routedNode,
    });
  }

  return traffic;
}

export { simulateTraffic };