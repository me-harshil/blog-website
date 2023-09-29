import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import auth from "../../firebase";
import { BsGoogle } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import back from "./my-account.jpg";
import "./login.css";
import { GoogleAuthProvider } from "firebase/auth";
export default function Signup(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential.user.accessToken) {
          localStorage.setItem("token", userCredential.user.accessToken);
          updateProfile(userCredential.user, {
            displayName: name,
          });
          console.log(userCredential.user.displayName);
          localStorage.setItem("name", name);
          props.showAlert("Account created successfully", "success");
          navigate("/");
        } else {
          props.showAlert("User already exists", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const googleProvider = new GoogleAuthProvider();

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the Google user's information in result.user
        const user = result.user;
        // console.log("Google Sign-Up successful", user);
        if (user.accessToken) {
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("token", user.email);
          props.showAlert("Logged in successfully", "success");
          navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((error) => {
        console.error("Google Sign-Up failed", error);
      });
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
        <div className="text-center my-4">
          <p>OR</p>
          <button
            onClick={signUpWithGoogle}
            className="m-2 btn btn-outline-dark"
          >
            <BsGoogle className="icon m-1" />
            SIGN UP WITH GOOGLE
          </button>
          <br />
        </div>
      </section>
    </>
  );
}
