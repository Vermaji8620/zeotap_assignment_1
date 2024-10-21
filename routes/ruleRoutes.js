import express from "express";
import { saveRule, evaluateRule } from "../controllers/ruleController.js";

const router = express.Router();

// Route to save a new rule
router.post("/rule/create", saveRule);

// Route to evaluate a rule
router.post("/rule/evaluate", evaluateRule);

export default router;
