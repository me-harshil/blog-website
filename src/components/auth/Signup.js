import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import back from "./my-account.jpg";
import "./login.css";
export default function Signup(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/user/register/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const response = await data.json();
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      props.showAlert("OTP send to your email.", "success");
      navigate("/verify-email");
    } else {
      props.showAlert("User already exists", "danger");
    }
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form method="post" onSubmit={handleSubmit}>
            <span>Username *</span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              aria-describedby="emailHelp"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <span>Email address *</span>
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
            <button className="button">Register</button>
          </form>
        </div>
      </section>
    </>
  );
}
