import { useState } from "react";
import { uploadAndAnalyze } from "../services/api";

function InsightsPanel() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;
  
    const data = await uploadAndAnalyze(file);
    console.log("API RESULT:", data);
    setResult(data);
  };

  return (
    <div className="card">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input"
      />

      <button onClick={handleAnalyze} className="secondary-button">
        Analyze Business Data
      </button>

      {result && (
        <div className="insights">
          <p><strong>Best Product:</strong> {result.best_product}</p>

          <p><strong>Top Region:</strong> {result.best_region}</p>

          <p><strong>Total Sales:</strong> ${result.total_revenue}</p>

          <p><strong>Total Orders:</strong> {result.total_orders}</p>

          <p><strong>Average Order Value:</strong> ${result.average_order_value}</p>
        </div>
      )}
    </div>
  );
}

export default InsightsPanel;
