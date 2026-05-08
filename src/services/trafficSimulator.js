import { generateRandomIP } from "../utils/generateRandomIP.js";

const simulateTraffic = (requestCount = 5) => {
  const traffic = [];

  for (let i = 0; i < requestCount; i++) {
    const ip = generateRandomIP();
    traffic.push({
      requestNumber: i + 1,
      ip,
    });
  }

  return traffic;
}

export { simulateTraffic };