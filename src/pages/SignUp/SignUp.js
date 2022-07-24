import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/LoginForm/LoginForm.css";

import "./SignUp.css";
import { useUserAuth } from "../../AuthContext/UserAuthContext";

const SignUp = () => {
  const { signUp } = useUserAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, username, password);

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="login-form">
        <h1 className="login-form-title">SignUp Now</h1>
        <div className="login-form-input">
          <input
            className="login-form-text"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="login-form-text"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
          />

          <input
            className="login-form-text"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <input
            className="login-form-text"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <div className="login-btn" onClick={handleSignUp}>
            SignUp
          </div>

          <p>
            I have account. Please <Link to="/login">login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
