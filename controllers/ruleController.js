import { Rule } from "../models/ruleModel.js";
import {
  create_rule,
  evaluate_rule,
  combine_rules,
} from "../utils/ruleEngine.js";

// Save a rule to MongoDB
export const saveRule = async (req, res) => {
  const { ruleString } = req.body;
  const ast = create_rule(ruleString);

  const newRule = new Rule({
    ruleString,
    ast,
  });
  // database saving doing here
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

// combine_rules
export const combineRules = async (req, res) => {
  const { ruleStrings, operator } = req.body;

  // Check if ruleStrings is an array and contains at least one rule
  if (!Array.isArray(ruleStrings) || ruleStrings.length === 0) {
    return res.status(400).json({ error: "Provide an array of rule strings" });
  }

  // Combine the rules using the specified operator (default to "AND")
  const combinedAST = combine_rules(ruleStrings, operator || "AND");

  const combinedRule = new Rule({
    ruleString: ruleStrings.join(` ${operator || "AND"} `),
    ast: combinedAST,
    description: "Combined rule",
  });

  try {
    const savedRule = await combinedRule.save();
    res.json({ message: "Combined rule saved successfully", rule: savedRule });
  } catch (err) {
    res.status(500).json({ error: "Error saving combined rule" });
  }
};
