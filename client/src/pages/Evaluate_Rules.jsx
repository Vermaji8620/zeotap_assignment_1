import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Evaluate_Rules = () => {
  const navigate = useNavigate();
  const [ruleString, setRuleString] = useState("");
  const [rules, setRules] = useState([]);
  const [testData, setTestData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/api/rule/getAll");
      setRules(response.data);
    })();
  }, [rules.length]);

  // Handle Rule Testing (You'd replace this with the actual API logic)
  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (
      !ruleString ||
      !testData.age ||
      !testData.department ||
      !testData.salary ||
      !testData.experience
    ) {
      return alert("All fields are required");
    }
  };

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6">
        {/* Rule Creation Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Create a Rule</h2>
          <div>
            <textarea
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              className="w-full p-3 bg-transparent border rounded mb-3"
              rows="3"
              placeholder="Copy and paste from the below preferred rules"
            ></textarea>
          </div>
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
        </div>

        <div
          className="flex float-left bg-blue-400 mt-10 p-2 rounded-md"
          onClick={() => {
            navigate("/combine_rules");
          }}
        >
          <button className="">{"<"}--Combine Rules </button>
        </div>
      </div>
    </div>
  );
};

export default Evaluate_Rules;
