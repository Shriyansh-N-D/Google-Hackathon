import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    navigate("/upload");
  };

  return (
    <div className="login-wrapper">
      <div className="auth-section">
        <img src="/final6.png" alt="FlagGuard Logo" className="logo" />
        <h2 className="welcome-text">
          {isRegister ? "Create an Account" : "Welcome to FlagGuard"}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="phone-input-wrapper">
          <PhoneInput
    international
    defaultCountry="IN"
    value={phone}
    onChange={setPhone}
    placeholder="Phone Number"
  />
          </div>

          {isRegister && (
            <>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
              <input type="date" placeholder="Date of Birth" required />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="action-button">
            {isRegister ? "Register" : "Login"}
          </button>

          <div className="toggle-container">
            <span>Login</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isRegister}
                onChange={() => setIsRegister(!isRegister)}
              />
              <span className="slider round"></span>
            </label>
            <span>Register</span>
          </div>
        </form>
      </div>

      <div className="pattern-section"></div>
    </div>
  );
};

export default Login;
