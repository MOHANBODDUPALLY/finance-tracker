import { useState } from "react";

function Login({ setUser }) {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    setUser({ id: 1, email });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;