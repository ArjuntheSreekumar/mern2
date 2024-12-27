import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();
  const location = useLocation();

  // Get the userId passed from the login page
  const { userId } = location.state || {}; // Default to empty if not found

  const [credentials, setCredentials] = useState({
    tourName: "",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showInvoice, setShowInvoice] = useState(false); // To toggle invoice display

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateFields = () => {
    let newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/; // Validate Indian phone numbers
    const nameRegex = /^[a-zA-Z\s]+$/; // Validate names with letters and spaces only

    if (!credentials.tourName.trim()) {
      newErrors.tourName = "Tour Name is required.";
    }

    if (!credentials.fullName.trim() || !nameRegex.test(credentials.fullName)) {
      newErrors.fullName = "Full Name should contain only letters.";
    }

    if (!credentials.phone || !phoneRegex.test(credentials.phone)) {
      newErrors.phone = "Phone number should be 10 digits and start with 6-9.";
    }

    if (!credentials.guestSize || Number(credentials.guestSize) <= 0) {
      newErrors.guestSize = "Guest size must be at least 1.";
    }

    if (!credentials.bookAt) {
      newErrors.bookAt = "Booking date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const postBookingDetails = () => {
    axios
      .post("http://localhost:4000/booking", credentials)
      .then((response) => {
        setConfirmationMessage("Booking confirmed! Your details have been saved.");
        setErrors({});
        setShowInvoice(true); // Show invoice after successful booking
      })
      .catch(() => {
        setErrors({ general: "Error submitting booking details. Please try again later." });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      postBookingDetails();
    }
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          rs.{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {!showInvoice ? (
        <>
          {/* Booking Form */}
          <div className="booking__form">
            <h5>Information</h5>
            <Form className="booking__info-form" onSubmit={handleSubmit}>
              <FormGroup>
                <input
                  type="text"
                  placeholder="Tour Name"
                  id="tourName"
                  required
                  value={credentials.tourName}
                  onChange={handleChange}
                />
                {errors.tourName && <p className="text-danger">{errors.tourName}</p>}
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="fullName"
                  required
                  value={credentials.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
              </FormGroup>
              <FormGroup>
                <input
                  type="number"
                  placeholder="Phone"
                  id="phone"
                  required
                  value={credentials.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </FormGroup>
              <FormGroup className="d-flex align-items-center gap-3">
                <input
                  type="date"
                  id="bookAt"
                  required
                  value={credentials.bookAt}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  placeholder="Guest"
                  id="guestSize"
                  required
                  value={credentials.guestSize}
                  onChange={handleChange}
                />
              </FormGroup>
              {errors.bookAt && <p className="text-danger">{errors.bookAt}</p>}
              {errors.guestSize && <p className="text-danger">{errors.guestSize}</p>}
              {errors.general && <p className="text-danger">{errors.general}</p>}
              {confirmationMessage && <p className="text-success">{confirmationMessage}</p>}
            </Form>
          </div>

          {/* Booking Bottom */}
          <div className="booking__bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  rs{price} <i className="ri-close-line"></i> {credentials.guestSize} person(s)
                </h5>
                <span>rs.{Number(price) * Number(credentials.guestSize)}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0">
                <h5>Service Charge</h5>
                <span>rs{serviceFee}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0 total">
                <h5>Total</h5>
                <span>rs{totalAmount}</span>
              </ListGroupItem>
            </ListGroup>

            <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
              Book Now
            </Button>
          </div>
        </>
      ) : (
        /* Invoice Section */
        <div className="booking__invoice">
          <h4>Invoice</h4>
          <ListGroup>
            <ListGroupItem>
              <h6>Customer Details</h6>
              <p>
                <strong>Name:</strong> {credentials.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {credentials.phone}
              </p>
              <p>
                <strong>Booking Date:</strong> {credentials.bookAt}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h6>Package Details</h6>
              <p>
                <strong>Tour Name:</strong> {credentials.tourName}
              </p>
              <p>
                <strong>Guests:</strong> {credentials.guestSize}
              </p>
              <p>
                <strong>Price per person:</strong> rs.{price}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h6>Total Price</h6>
              <p>
                <strong>Subtotal:</strong> rs.{Number(price) * Number(credentials.guestSize)}
              </p>
              <p>
                <strong>Service Fee:</strong> rs.{serviceFee}
              </p>
              <p>
                <strong>Total:</strong> rs.{totalAmount}
              </p>
            </ListGroupItem>
          </ListGroup>
          <Button
  className="btn primary__btn w-100 mt-4"
  onClick={() =>
    navigate("/thank-you", {
      state: {
        userId,
        bookingDetails: credentials,
        totalAmount,
        serviceFee,
        pricePerPerson: price,
      },
    })
  }
>
  Proceed to Thank You Page
</Button>
        </div>
      )}
    </div>
  );
};

export default Booking;
