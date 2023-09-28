import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoHomeOutline } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import "./Navbar.css";
import logo from "./logo.png";
export default function Navbar() {
  const logout = () => {
    localStorage.clear();
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="150px" height="150px" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  <IoHomeOutline className="icon mr-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/contact"
                >
                  <HiOutlineLightBulb className="icon" />
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/techblogs" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/techblogs"
                >
                  <GrTechnology className="icon" />
                  Tech Blogs
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/addpost"
                  role="button"
                >
                  Add Post
                </Link>
              </>
            ) : null}
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  <BiLogIn className="icon" />
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  <SiGnuprivacyguard className="icon" />
                  Signup
                </Link>
              </>
            ) : (
              <Link
                className="btn btn-primary mx-2"
                to="/login"
                role="button"
                onClick={logout}
              >
                <BiLogOut className="icon" />
                Logout
              </Link>
            )}
            
          </div>
        </div>
      </nav>
    </div>
  );
}
