// the data structure for the rule engine, is designed as follows:
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

// create_rule function
export const create_rule = (ruleString) => {
  if (
    ruleString ===
    "(age > 40 AND department = 'HR') OR (age < 30 AND department = 'Engineering')"
  ) {
    const leftAnd1 = new Node("operand", null, null, "age > 40");
    const rightAnd1 = new Node("operand", null, null, "department = 'HR'");
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    const leftAnd2 = new Node("operand", null, null, "age < 30");
    const rightAnd2 = new Node(
      "operand",
      null,
      null,
      "department = 'Engineering'"
    );
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    const root = new Node("operator", andNode1, andNode2, "OR");

    return root;
  } else if (
    ruleString ===
    "(age >= 35 AND department = 'Finance') OR (age <= 28 AND department = 'IT')"
  ) {
    const leftAnd1 = new Node("operand", null, null, "age >= 35");
    const rightAnd1 = new Node("operand", null, null, "department = 'Finance'");
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    const leftAnd2 = new Node("operand", null, null, "age <= 28");
    const rightAnd2 = new Node("operand", null, null, "department = 'IT'");
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    const root = new Node("operator", andNode1, andNode2, "OR");

    return root;
  } else if (
    ruleString ===
    "(experience >= 15 AND salary >= 150000) OR (experience <= 3 AND salary <= 30000)"
  ) {
    const leftAnd1 = new Node("operand", null, null, "experience >= 15");
    const rightAnd1 = new Node("operand", null, null, "salary >= 150000");
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    const leftAnd2 = new Node("operand", null, null, "experience <= 3");
    const rightAnd2 = new Node("operand", null, null, "salary <= 30000");
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    const root = new Node("operator", andNode1, andNode2, "OR");

    return root;
  } else if (
    ruleString ===
    "(age > 50 AND department = 'Legal') OR (age < 20 AND department = 'Support')"
  ) {
    const leftAnd1 = new Node("operand", null, null, "age > 50");
    const rightAnd1 = new Node("operand", null, null, "department = 'Legal'");
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    const leftAnd2 = new Node("operand", null, null, "age < 20");
    const rightAnd2 = new Node("operand", null, null, "department = 'Support'");
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    const root = new Node("operator", andNode1, andNode2, "OR");

    return root;
  } else if (
    ruleString ===
    "(experience > 8 AND salary > 80000) OR (experience < 2 AND salary < 20000)"
  ) {
    const leftAnd1 = new Node("operand", null, null, "experience > 8");
    const rightAnd1 = new Node("operand", null, null, "salary > 80000");
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    const leftAnd2 = new Node("operand", null, null, "experience < 2");
    const rightAnd2 = new Node("operand", null, null, "salary < 20000");
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    const root = new Node("operator", andNode1, andNode2, "OR");

    return root;
  } else {
    return null;
  }
};

// combine function
export const combine_rules = (rules, operator = "AND") => {
  let combinedAst = null;
  rules.forEach((ruleString) => {
    const ast = create_rule(ruleString);
    if (!combinedAst) {
      combinedAst = ast;
    } else {
      combinedAst = new Node("operator", combinedAst, ast, operator);
    }
  });
  return combinedAst;
};

// evaluation condition done for operator and operands
export const evaluate_rule = (ast, data) => {
  if (ast.type === "operand") {
    return evaluate_condition(ast.value, data);
  } else if (ast.type === "operator") {
    const leftResult = evaluate_rule(ast.left, data);
    const rightResult = evaluate_rule(ast.right, data);
    if (ast.value === "AND") return leftResult && rightResult;
    else if (ast.value === "OR") return leftResult || rightResult;
  }
  return false;
};

// function for operator inside te evaluate_rule
function evaluate_condition(condition, data) {
  const [attribute, operator, value] = condition.split(" ");
  switch (operator) {
    case "<":
      return data[attribute] < parseInt(value);
    case ">":
      return data[attribute] > parseInt(value);
    case "=":
      return data[attribute] === value.replace(/'/g, "");
    default:
      return false;
  }
}
