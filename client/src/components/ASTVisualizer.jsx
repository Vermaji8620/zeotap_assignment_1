import Tree from "react-d3-tree";
import PropTypes from "prop-types";

const ASTVisualizer = ({ ast }) => {
  const convertASTToTreeData = (ast) => {
    if (!ast) return null;

    const node = {
      name: ast.value,
      children: [],
    };

    if (ast.left) {
      node.children.push(convertASTToTreeData(ast.left));
    }

    if (ast.right) {
      node.children.push(convertASTToTreeData(ast.right));
    }

    if (node.children.length === 0) {
      delete node.children;
    }

    return node;
  };

  const treeData = convertASTToTreeData(ast);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
  );
};

ASTVisualizer.propTypes = {
  ast: PropTypes.object.isRequired,
};

export default ASTVisualizer;
