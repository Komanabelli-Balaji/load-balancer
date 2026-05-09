import express from "express";
import { 
  trafficSimulatorController,
  getAllNodesController,
  addNodeController,
  deleteNodeController,
  updateNodeHealthController,
  getMetricsController,
  rateLimitingController,
} from "../controllers/loadBalancerControllers.js";

const router = express.Router();

router.get("/simulate", trafficSimulatorController);
router.get("/nodes", getAllNodesController);
router.post("/nodes", addNodeController);
router.delete("/nodes/:node", deleteNodeController);
router.patch("/nodes/:node/health", updateNodeHealthController);
router.get("/metrics", getMetricsController);
router.get("/route/:ip", rateLimitingController);

export default router;