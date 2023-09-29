import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const socialIconStyle = {
    marginRight: "25px",
  };
  const logout = () => {
    localStorage.clear();
  };
  return (
    <footer className="footer" style={{ border: "1px solid #ccc" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <h2>SITEMAP</h2>
              <Link to="/">Home</Link>
              <br />
              <Link to="/contact">Contact</Link>
              <br />
              <Link to="/techblogs">TechBlogs</Link>
              <br />
              {localStorage.getItem("token") ? (
                <Link to="/login" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/signup">Sign Up</Link>
                  <br />
                  <Link to="/login">Login</Link>
                </>
              )}
          </div>
          <div className="col-lg-5">
            <h2>About Us</h2>
            <p>Our mission is to provide you with the latest tech news, insightful
      articles, how-to guides, and product reviews that empower you to navigate
      the digital world with confidence.</p>
          </div>
          <div className="col-lg-4">
          <h4>🌟Stay Connected on Social Media!🌟</h4>
              <div className="d-flex p-3">
                <a href="https://www.facebook.com" className="social-icon" style={socialIconStyle} target="_black"><h2>
                  <FontAwesomeIcon icon={faFacebook} /></h2>
                </a>
                <a href="https://www.x.com" className="social-icon" style={socialIconStyle} target="_black">
                  <h2><FontAwesomeIcon icon={faTwitter} /></h2>
                </a>
                <a href="https://www.instagram.com" className="social-icon" target="_black">
                  <h2><FontAwesomeIcon icon={faInstagram} /></h2>
                </a>
              </div>
          </div>
          {/* <div className="social-media">
              
            </div>
          </div>
          <div className="col">
            <div className="contact-info">
              <h4>
                <Link to="/contact">Contact</Link>
              </h4>
            </div>*/}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="copyright text-center">
              <p>&copy; 2023 TrendyBytes. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
