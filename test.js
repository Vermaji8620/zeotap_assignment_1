import { combine_rules, create_rule, showast } from "./ruleEngine.js";

const rule1 =
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 =
  "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

// testing for create rule
const ast1 = create_rule(rule1);
const ast2 = create_rule(rule2);
// showast(ast1);

// combining of ast's
const combinedAst = combine_rules([rule1, rule2]);
showast(combinedAst);
// console.log(combinedAst);

//
