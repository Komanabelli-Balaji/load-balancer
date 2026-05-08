import express from "express";
import { trafficSimulatorController } from "../controllers/loadBalancerControllers.js";

const router = express.Router();

router.get("/simulate", trafficSimulatorController);

export default router;