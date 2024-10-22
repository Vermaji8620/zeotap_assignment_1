import PropTypes from "prop-types";

const EveryItem = ({ rule, onRuleSelect }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={rule._id}
        className="mr-2 w-6 h-6"
        onChange={(e) => {
          onRuleSelect(rule.ruleString, e.target.checked);
        }}
      />
      <label htmlFor="rule1" className="text-md">
        {rule.ruleString}
      </label>
    </div>
  );
};

EveryItem.propTypes = {
  rule: PropTypes.any.isRequired,
  onRuleSelect: PropTypes.func.isRequired,
};

export default EveryItem;
