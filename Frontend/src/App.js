import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="auth-container">
        <Login onLogin={handleLogin} />
        <Register />
      </div>
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;
