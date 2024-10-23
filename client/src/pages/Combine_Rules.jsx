import { useEffect, useState } from "react";
import EveryItem from "../components/EveryItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ASTVisualizer from "../components/ASTVisualizer";

const Combine_Rules = () => {
  const [ast, setAst] = useState(null);
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [combinedStringtoDisplay, setCombinedStringtoDisplay] = useState("");
  const [allelementsToCombine, setAllelementsToCombine] = useState([]);
  useEffect(() => {
    console.log(allelementsToCombine);
  }, [allelementsToCombine]);

  // logic for adding or deleting items in the array, when a particular item is selected
  const handleRuleSelect = (ruleString, isSelected) => {
    setAllelementsToCombine((prevSelectedRules) => {
      if (isSelected) {
        return [...prevSelectedRules, ruleString];
      } else {
        return prevSelectedRules.filter(
          (everyRule) => everyRule !== ruleString
        );
      }
    });
  };

  const operatorhandleFunc = async (operator_type) => {
    if (allelementsToCombine.length <= 1) {
      alert("Select at least 2 rules to combine them");
      return;
    }
    try {
      const resp = await axios.post("http://localhost:3000/api/rule/combine", {
        ruleStrings: allelementsToCombine,
        operator: operator_type,
      });
      // handling of the error and alerting accordingly
      if (resp.status == 201 && resp.data && resp.data.message) {
        alert(resp.data.message);
        setCombinedStringtoDisplay(resp.data.ruleString);
        setAst(resp.data.ast);
      } else if (resp.status == 500 && resp.data && resp.data.error) {
        alert(resp.data.error);
      }
    } catch (error) {
      alert("Some error occured while combining the rules", error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/api/rule/getAll");
      setRules(response.data);
    })();
  }, [rules.length]);

  return (
    <div>
      <div className="max-w-3xl mx-auto p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Combine Rules</h2>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Select Rules to Combine:
          </label>
          {/* logic for appending every item from database */}
          <div className="flex flex-col space-y-3">
            {rules && rules.length > 0 ? (
              rules.map((rule, index) => (
                <div key={index}>
                  <EveryItem rule={rule} onRuleSelect={handleRuleSelect} />
                </div>
              ))
            ) : (
              <div className="text-red-400">No items created</div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Select Logical Operator:
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                operatorhandleFunc("AND");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              AND
            </button>
            <button
              onClick={() => {
                operatorhandleFunc("OR");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              OR
            </button>
          </div>
        </div>

        {/* for displaying the combined rule */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Combined Rule:
          </label>
          <div className="p-4 rounded-md">
            <div id="combinedRuleText" className="text-md text-red-200">
              {combinedStringtoDisplay && combinedStringtoDisplay.length > 0 ? (
                <p>{combinedStringtoDisplay} </p>
              ) : (
                <p>Please combine rules to display them</p>
              )}
            </div>
          </div>
        </div>

        {/* for displaying the ast */}
        {ast && (
          <div className="mt-4">
            <h3>AST Visualization:</h3>
            <ASTVisualizer ast={ast} />
          </div>
        )}

        <div
          className="flex float-left bg-blue-400 p-2 rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          <button className="">{"<"}-- Create New Rules </button>
        </div>
        <div
          className="flex float-right bg-blue-400 p-2 rounded-md"
          onClick={() => {
            navigate("/evaluate_rules");
          }}
        >
          <button className="">Evaluate Rules --{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Combine_Rules;
