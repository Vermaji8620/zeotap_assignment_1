import express from "express";
import { saveRule, evaluateRule, combineRules } from "../controllers/ruleController.js";

const router = express.Router();

// Route to save a new rule
router.post("/rule/create", saveRule);

// Route to evaluate a rule
router.post("/rule/evaluate", evaluateRule);

// Route to combine rules
router.post('/rule/combine', combineRules)

export default router;
