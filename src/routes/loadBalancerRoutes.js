import express from "express";
import { 
  trafficSimulatorController,
  getAllNodesController,
  addNodeController,
  deleteNodeController,
  updateNodeHealthController,
  getMetricsController,
} from "../controllers/loadBalancerControllers.js";

const router = express.Router();

router.get("/simulate", trafficSimulatorController);
router.get("/nodes", getAllNodesController);
router.post("/nodes", addNodeController);
router.delete("/nodes/:node", deleteNodeController);
router.patch("/nodes/:node/health", updateNodeHealthController);
router.get("/metrics", getMetricsController);

export default router;