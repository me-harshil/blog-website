import React, { useState } from "react";
import auth from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {BsGoogle} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import back from "./my-account.jpg";
import "./login.css";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.accessToken) {
          localStorage.setItem("token", userCredential.user.accessToken);
          localStorage.setItem("name", userCredential.user.displayName);
          props.showAlert("Logged in successfully", "success");
          navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((err) => {
        props.showAlert("User not signed up", "danger");
      });
  };
  const googleProvider = new GoogleAuthProvider();
  // Trigger Google Sign-In
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the Google user's information in result.user
        const user = result.user;
        console.log("Google Sign-In successful", user.email);
        // console.log(user.accessToken);
        if (user.accessToken) {
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("email", user.email);
          props.showAlert("Logged in successfully", "success");
          navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((error) => {
        console.error("Google Sign-In failed", error);
      });
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
        <div className="text-center my-4">
          <p>OR</p>
          <button
            onClick={signInWithGoogle}
            className="m-2 btn btn-outline-dark"
          >
            <BsGoogle className="icon m-1" />
            SIGN IN WITH GOOGLE
          </button>
          <br />
        </div>
      </section>
    </>
  );
}
