import "./App.css";
import Combine_Rules from "./pages/Combine_Rules";
import Evaluate_Rules from "./pages/Evaluate_Rules";
import Make_New_Rules from "./pages/Make_New_Rules";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-3xl font-bold font-serif text-center">
        Rule Engine Application
      </h1>
      <Routes>
        <Route path="/" element={<Make_New_Rules />} />
        <Route path="/combine_rules" element={<Combine_Rules />} />
        <Route path="/evaluate_rules" element={<Evaluate_Rules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
