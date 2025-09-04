import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../css/Register.css"; 

export default function Register() {
  const [username, setUsername] = useState("");
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
      const data = await apiRequest("/auth/register", "POST", {
        username,
        email,
        password,
      });
      login(data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-text"> Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
      </div>
  
  );
}
