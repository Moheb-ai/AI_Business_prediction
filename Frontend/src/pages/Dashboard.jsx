import PredictionPanel from "../components/PredictionPanel";
import InsightsPanel from "../components/InsightsPanel";

function Dashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">AI Automation</h2>
        <p className="tagline">Business Intelligence</p>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </aside>

      <main className="content">
        <section className="section">
          <h3 className="section-title">Sales Prediction (6 Months)</h3>
          <PredictionPanel />
        </section>

        <section className="section">
          <h3 className="section-title">Business Insights</h3>
          <InsightsPanel />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
