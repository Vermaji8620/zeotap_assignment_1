// the data structure for the rule engine, is designed as follows:
export class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

// create a new rule function
export const create_rule = (ruleString) => {
  const ast = new Node(
    "operator",
    new Node("operand", null, null, "age > 30"),
    new Node("operand", null, null, "salary > 50000"),
    "AND"
  );
  // return the ast as stated in the pdf document
  return ast;
};


