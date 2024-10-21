import { Rule } from "../models/ruleModel.js";
import { create_rule, evaluate_rule } from "../utils/ruleEngine.js";

// Save a rule to MongoDB
export const saveRule = async (req, res) => {
  const { ruleString, description } = req.body;
  const ast = create_rule(ruleString);

  const newRule = new Rule({
    ruleString,
    ast,
    description,
  });

  try {
    const savedRule = await newRule.save();
    res.json({ message: "Rule saved successfully", rule: savedRule });
  } catch (err) {
    res.status(500).json({ error: "Error saving rule" });
  }
};

// Retrieve and evaluate rule
export const evaluateRule = async (req, res) => {
  const { ruleString, data } = req.body;

  try {
    const rule = await Rule.findOne({ ruleString });
    if (!rule) return res.status(404).json({ error: "Rule not found" });

    const result = evaluate_rule(rule.ast, data);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "Error evaluating rule" });
  }
};
