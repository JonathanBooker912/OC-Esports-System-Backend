import metrics from "../controllers/metric.controller.js";
import { authenticate } from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Create a new Metric
router.post("/", [authenticate], metrics.create);

// Update a Metric by ID
router.put("/:id", [authenticate], metrics.update);

// Delete a Metric by ID
router.delete("/:id", [authenticate], metrics.delete);

// Get all Metrics for a given title
router.get("/title/:titleId", [authenticate], metrics.getAllForTitle);

// Get a single Metric by ID
router.get("/:id", [authenticate], metrics.getById);

// Get the Enum Values for Metric Types
router.get("/values/metricTypes", metrics.getMetricTypes);

// Get the Enum Values for Data Types
router.get("/values/dataTypes", metrics.getDataTypes);

export default router;