import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const formHandler = async (e) => {
    e.preventDefault();

    await login(email, password);
    /*
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(response.error);
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      console.log("Login successful:", data);
    } catch (error) {
      console.log(error.message);
    }
    */
  };

  return (
    <div>
      <form onSubmit={formHandler} className="login">
        <h3>Please Enter Your Details to login</h3>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} type="submit">
          Submit
        </button>
        <div className="error">{error}</div>
      </form>
    </div>
  );
}

export default Login;
