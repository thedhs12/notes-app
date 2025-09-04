import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", "POST", { email, password });
      login(data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-right">
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
          <p className="switch-text">  Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      </div>
    </div>
  );
}
