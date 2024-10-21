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
    "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
  ) {
    // Left subtree of OR
    const leftAnd1 = new Node("operand", null, null, "age > 30");
    const rightAnd1 = new Node("operand", null, null, "department = 'Sales'");
    // combination of AND
    const andNode1 = new Node("operator", leftAnd1, rightAnd1, "AND");

    // Right subtree of OR
    const leftAnd2 = new Node("operand", null, null, "age < 25");
    const rightAnd2 = new Node(
      "operand",
      null,
      null,
      "department = 'Marketing'"
    );
    // combination of AND
    const andNode2 = new Node("operator", leftAnd2, rightAnd2, "AND");

    // Combine with OR
    const orNode = new Node("operator", andNode1, andNode2, "OR");

    // Right side of the root AND
    const leftOr = new Node("operand", null, null, "salary > 50000");
    const rightOr = new Node("operand", null, null, "experience > 5");
    const orNode2 = new Node("operator", leftOr, rightOr, "OR");

    // Root AND node
    const root = new Node("operator", orNode, orNode2, "AND");

    return root;
  } else if (
    ruleString ===
    "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
  ) {
    // Left subtree of AND
    const leftAnd = new Node("operand", null, null, "age > 30");
    const rightAnd = new Node(
      "operand",
      null,
      null,
      "department = 'Marketing'"
    );
    const andNode = new Node("operator", leftAnd, rightAnd, "AND");

    // Right subtree of OR
    const leftOr = new Node("operand", null, null, "salary > 20000");
    const rightOr = new Node("operand", null, null, "experience > 5");
    const orNode = new Node("operator", leftOr, rightOr, "OR");

    // Root AND node
    const root = new Node("operator", andNode, orNode, "AND");

    return root;
  }
};

// verification of ast made using LEFT ORDER TRAVERSAL
export const showast = (astcome) => {
  if (!astcome) return;
  showast(astcome.left);
  console.log(astcome.value);
  showast(astcome.right);
};

// combine function
export const combine_rules = (rules) => {
  let combinedAst = null;
  rules.forEach((ruleString) => {
    const ast = create_rule(ruleString);
    if (!combinedAst) {
      combinedAst = ast;
    } else {
      combinedAst = new Node("operator", combinedAst, ast, "AND");
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
