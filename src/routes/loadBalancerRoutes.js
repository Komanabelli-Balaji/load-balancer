import express from "express";
import { 
  trafficSimulatorController,
  getAllNodesController,
  addNodeController,
  deleteNodeController
} from "../controllers/loadBalancerControllers.js";

const router = express.Router();

router.get("/simulate", trafficSimulatorController);
router.get("/nodes", getAllNodesController);
router.post("/nodes", addNodeController);
router.delete("/nodes/:node", deleteNodeController);

export default router;