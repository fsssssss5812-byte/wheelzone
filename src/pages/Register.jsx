import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  isEmail,
  isPkPhone,
  passwordProblems,
  passwordStrength,
} from "../utils/validators.js";

const empty = { name: "", email: "", phone: "", password: "", confirm: "", terms: false };

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) e.name = "Name must be at least 3 characters";
    else if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(form.name.trim()))
      e.name = "Name can only contain letters and spaces";
    if (!isEmail(form.email)) e.email = "Enter a valid email address";
    if (!isPkPhone(form.phone)) e.phone = "Enter a valid number, e.g. 0300-1234567";
    const pw = passwordProblems(form.password);
    if (pw.length) e.password = "Password needs " + pw.join(", ");
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (!form.terms) e.terms = "You must accept the terms to continue";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const res = register(form);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setDone(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  if (done) {
    return (
      <div className="auth-card success">
        <h2>✅ Account created!</h2>
        <p>Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Create your account</h2>
      <p className="muted">Join WheelHub to save cars and book test drives.</p>

      {serverError && <div className="alert">{serverError}</div>}

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={change} placeholder="Ali Khan" />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={change} placeholder="ali@example.com" />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} placeholder="0300-1234567" />
          {errors.phone && <small className="error">{errors.phone}</small>}
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
              placeholder="Min 8 characters, letters + numbers"
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          {form.password && (
            <small className="strength">Strength: {passwordStrength(form.password)}</small>
          )}
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type={showPw ? "text" : "password"}
            value={form.confirm}
            onChange={change}
          />
          {errors.confirm && <small className="error">{errors.confirm}</small>}
        </div>

        <label className="check">
          <input type="checkbox" name="terms" checked={form.terms} onChange={change} />
          <span>I agree to the terms and conditions</span>
        </label>
        {errors.terms && <small className="error">{errors.terms}</small>}

        <button className="btn block" type="submit">Register</button>
      </form>

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
