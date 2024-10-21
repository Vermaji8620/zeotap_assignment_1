import { combine_rules, create_rule, evaluate_rule, showast } from "./ruleEngine.js";

const rule1 =
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 =
  "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

// testing for create rule
const ast1 = create_rule(rule1);
const ast2 = create_rule(rule2);
// showast(ast1);
// console.log(combinedAst);

// combining of ast's
const combinedAst = combine_rules([rule1, rule2]);
// showast(combinedAst);
// console.log(combinedAst);

// now for testing ( evaluating ) 
const data1 = { age: 35, department: "Sales", salary: 60000, experience: 3 };
const data2 = { age: 28, department: "Marketing", salary: 22000, experience: 6 };

const evaluate_first = evaluate_rule(ast1, data1);
const evaluate_second = evaluate_rule(ast1, data2);


console.log(evaluate_first)
console.log(evaluate_second)
