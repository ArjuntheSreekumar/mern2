import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImg from "../assets/images/tour-img02.jpg";
import userIcon from "../assets/images/user.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Handle login errors
  const [loading, setLoading] = useState(false); // Loading state for request
  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex
    return emailRegex.test(email);
  };

  // Form submission handler
  const handleClick = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    // Check email validity
    if (!isValidEmail(credentials.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Invalid email or password!");
        return;
      }

      // If login is successful, get user data including userId
      const userId = result.user.id; // Assuming the response includes user info with userId

      // Save the token and userId to localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", userId); // Save userId

      // Redirect to the booking page and send userId
      alert("Login successful!");
      navigate("/bookings", { state: { userId } }); // Pass userId to bookings page
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              {/* Image Section */}
              <div className="login__img">
                <img src={loginImg} alt="Login Illustration" />
              </div>

              {/* Form Section */}
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  {/* Display errors */}
                  {error && <p className="text-danger">{error}</p>}

                  {/* Submit Button */}
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : "Login"}
                  </Button>
                </Form>

                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
