import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/signup/",
        {
          userName,
          email,
          password,
        }
      );
      if (response) {
        toast("Successfully signed up!!");
        navigate("/login");
      }
    } catch (error) {
      toast("Something went wrong! Check the entered details");
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} method="post">
        <h2>Sign Up</h2>
        <p style={{ position: "relative", right: "30px" }}>
          Please fill in this form to create an account!
        </p>
        <hr />
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="username"
              value={userName}
              placeholder="Username"
              required="required"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-paper-plane"></i>
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required="required"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required="required"
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
      <div className="text-center">
        Go to <Link to="/">Home Page 🏠</Link>
      </div>
      <ToastContainer />
    </div>
  );
}
