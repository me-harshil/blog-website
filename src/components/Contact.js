import React, { useState } from "react";
import back from '../components/auth/my-account.jpg'
import '../components/auth/login.css'
export default function Contact(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/blogs/contact";
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          subject: e.target.topic.value,
          message: e.target.message.value,
        }),
      });
      const response = await data.json();
      console.log(response);
      props.showAlert("Message Sent Successfully", "success");
    } catch (err) {
      props.showAlert("Message Not Sent", "danger");
    }
    setFormData({
      name: "",
      email: "",
      topic: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
    <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h1>Contact Us</h1>
            </div>
          </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control border border-dark"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
    </section>
    </>
  );
}
