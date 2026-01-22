import { useState } from "react";
import ForecastChart from "./ForecastChart";
import { getForecast } from "../services/api";

function PredictionPanel() {
  const [file, setFile] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) return alert("Upload CSV first");

    setLoading(true);
    const data = await getForecast(file);
    setForecast(data.forecast);
    setLoading(false);
  };

  return (
    <div className="card">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input"
      />

      <button onClick={handlePredict} className="primary-button">
        {loading ? "Predicting..." : "Run Forecast"}
      </button>

      {forecast.length > 0 && <ForecastChart data={forecast} />}
    </div>
  );
}

export default PredictionPanel;
