import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RuleEngineApp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ruleString, setRuleString] = useState("");
  const [rules, setRules] = useState([]);

  // func for getting all the entries from the database
  const getAllEntriesInDBfunc = async () => {
    const response = await axios.get("http://localhost:3000/api/rule/getAll");
    setRules(response.data);
  };
  useEffect(() => {
    getAllEntriesInDBfunc();
    const interv = setInterval(() => {
      getAllEntriesInDBfunc();
    }, 5000);

    return () => {
      clearInterval(interv);
    };
  }, [rules.length]);

  // Handle Rule Submission
  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      setRuleString("");
    }
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
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {loading ? <div>Saving...</div> : <div>Save rule</div>}
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
                </li>
              ))
            ) : (
              <p className="text-gray-500">No rules saved yet.</p>
            )}
          </ul>
        </div>

        <div
          className="flex float-right bg-blue-400 p-2 rounded-md"
          onClick={() => {
            navigate("/combine_rules");
          }}
        >
          <button className="">Combine Rules --{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default RuleEngineApp;
