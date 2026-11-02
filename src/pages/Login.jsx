import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { isEmail } from "../utils/validators.js";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState("");

  if (user) return <Navigate to={from} replace />;

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
    setServerError("");
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!isEmail(form.email)) e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    if (Object.keys(e).length) return;
    const res = login(form);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <p className="muted">Login to save cars and book a test drive.</p>

      {location.state?.from && !serverError && (
        <div className="alert info">Please login to continue.</div>
      )}
      {serverError && <div className="alert">{serverError}</div>}

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={change} placeholder="ali@example.com" />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="pw-wrap">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={change}
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        <button className="btn block" type="submit">Login</button>
      </form>

      <p className="switch">
        New to WheelHub? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
