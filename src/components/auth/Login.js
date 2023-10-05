import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "./my-account.jpg";
import "./login.css";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/user/login/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const response = await data.json();
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else if (response.otpError) {
      localStorage.clear();
      props.showAlert("OTP not verified", "danger");
      navigate("/signup");
    } else {
      localStorage.clear();
      props.showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form method="post" onSubmit={handleSubmit}>
            <span>Email Address *</span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              aria-describedby="emailHelp"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <span>Password *</span>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button className="button">Log in</button>
          </form>
        </div>
      </section>
    </>
  );
}
