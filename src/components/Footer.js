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

  return (
    <footer className="footer" style={{ border: "1px solid #ccc" }}>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="social-media">
              <h4>🌟 Stay Connected on Social Media! 🌟</h4>
              <div className="d-flex custom-padding">
                <a href="https://www.facebook.com" className="social-icon" style={socialIconStyle} target="_black">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.x.com" className="social-icon" style={socialIconStyle} target="_black">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com" className="social-icon" target="_black">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="contact-info">
              <h4>
                <Link to="/contact">Contact</Link>
              </h4>
            </div>
          </div>
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
