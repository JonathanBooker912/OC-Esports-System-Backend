import chartData from "../controllers/chartData.controller.js";
import { authenticate, isAdmin } from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Get all matches
router.get("/player/:aliasId/metric/:metricId", chartData.findAllDataForPlayer);


export default router;
