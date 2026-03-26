import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return user ? (
    <Dashboard user={user} />
  ) : (
    <Login setUser={handleLogin} />
  );
}

export default App;