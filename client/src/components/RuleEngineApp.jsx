import { useEffect, useState } from "react";
import axios from "axios";

const RuleEngineApp = () => {
  const [ruleString, setRuleString] = useState("");
  const [rules, setRules] = useState([]);
  const [testData, setTestData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/api/rule/getAll");
      setRules(response.data);
    })();
  }, [rules.length]);

  // Handle Rule Submission
  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:3000/api/rule/create", {
        ruleString,
      });
      if (resp.status == 201 && resp.data && resp.data.message) {
        alert(resp.data.message);
      } else if (resp.status == 500 && resp.data && resp.data.error) {
        alert(resp.data.error);
      } else {
        alert("Error creating rule");
      }
    } catch (error) {
      alert("Error creating rule", error);
    } finally {
      setRuleString("");
    }
  };

  // Handle Rule Testing (You'd replace this with the actual API logic)
  const handleTestSubmit = (e) => {
    e.preventDefault();
    // Simulate rule evaluation (simple logic for now)
    setEvaluationResult("Eligible");
  };

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6">
        {/* Rule Creation Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Create a Rule</h2>
          <form onSubmit={handleRuleSubmit}>
            <textarea
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              className="w-full p-3 bg-transparent border rounded mb-3"
              rows="3"
              placeholder="Copy and paste from the below preferred rules"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Rule
            </button>
          </form>
        </div>
        {/* Preferred rules to copy */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 underline">
            Preferred Rules
          </h2>
          <p className="mb-4">
            (age &gt; 40 AND department = &apos;HR&apos;) OR (age &lt; 30 AND
            department = &apos;Engineering&apos;)
          </p>
          <p className="mb-4">
            (age &gt;= 35 AND department = &apos;Finance&apos;) OR (age &lt;= 28
            AND department = &apos;IT&apos;)
          </p>
          <p className="mb-4">
            (experience &gt;= 15 AND salary &gt;= 150000) OR (experience &lt;= 3
            AND salary &lt;= 30000)
          </p>
          <p className="mb-4">
            (age &gt; 50 AND department = &apos;Legal&apos;) OR (age &lt; 20 AND
            department = &apos;Support&apos;)
          </p>

          <p className="mb-4">
            (experience &gt; 8 AND salary &gt; 80000) OR (experience &lt; 2 AND
            salary &lt; 20000)
          </p>
        </div>

        {/* Existing Rules */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 underline">
            Existing Rules in Database
          </h2>
          <ul className="divide-y divide-gray-200">
            {rules.length > 0 ? (
              rules.map((rule) => (
                <li
                  key={rule._id}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{rule.ruleString}</span>
                  {/* <button className="text-red-500 hover:underline">
                    Delete
                  </button> */}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No rules saved yet.</p>
            )}
          </ul>
        </div>

        {/* Rule Testing Form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Rule</h2>
          <form
            onSubmit={handleTestSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="number"
              placeholder="Age"
              value={testData.age}
              onChange={(e) =>
                setTestData({ ...testData, age: e.target.value })
              }
              className="p-2 bg-transparent border rounded"
            />
            <input
              type="text"
              placeholder="Department"
              value={testData.department}
              onChange={(e) =>
                setTestData({ ...testData, department: e.target.value })
              }
              className="p-2 bg-transparent border rounded"
            />
            <input
              type="number"
              placeholder="Salary"
              value={testData.salary}
              onChange={(e) =>
                setTestData({ ...testData, salary: e.target.value })
              }
              className="p-2 bg-transparent border rounded"
            />
            <input
              type="number"
              placeholder="Experience"
              value={testData.experience}
              onChange={(e) =>
                setTestData({ ...testData, experience: e.target.value })
              }
              className="p-2 bg-transparent border rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 col-span-1 md:col-span-2"
            >
              Test Rule
            </button>
          </form>
          {evaluationResult && (
            <div className="mt-4 text-lg font-semibold">
              Evaluation Result:{" "}
              <span className="text-green-600">{evaluationResult}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuleEngineApp;
