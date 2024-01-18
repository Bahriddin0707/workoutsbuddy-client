import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const formHandler = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
    /*
    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setName("");
      setEmail("");
      setPassword("");
      console.log("Registration successful:", data);
    } catch (error) {
      console.log(error.message);
    }  
   */
  };

  return (
    <div>
      <form onSubmit={formHandler} className="signup">
        <h3>Please Enter Your Details to register</h3>
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

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
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
