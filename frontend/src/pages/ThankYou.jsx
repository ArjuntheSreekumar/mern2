import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useLocation, Link } from "react-router-dom";
import "./thank-you.css";

const ThankYou = () => {
  const location = useLocation();

  // Destructure booking details passed via state
  const { userId, bookingDetails, totalAmount, serviceFee, pricePerPerson } = location.state || {};

  if (!bookingDetails) {
    return <h1>No booking details found. Please try again!</h1>;
  }

  const { tourName, fullName, phone, guestSize, bookAt } = bookingDetails;

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-check-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You!</h1>
              <p className="mb-4">Your booking was successful. Here is your invoice:</p>
            </div>

            {/* Invoice Section */}
            <div className="invoice">
              <h4>Booking Invoice</h4>
              <ListGroup>
                <ListGroupItem>
                  <h6>Customer Details</h6>
                  <p><strong>Name:</strong> {fullName}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>Booking Date:</strong> {bookAt}</p>
                </ListGroupItem>
                <ListGroupItem>
                  <h6>Tour Details</h6>
                  <p><strong>Tour Name:</strong> {tourName}</p>
                  <p><strong>Number of Guests:</strong> {guestSize}</p>
                  <p><strong>Price per Person:</strong> ₹{pricePerPerson}</p>
                </ListGroupItem>
                <ListGroupItem>
                  <h6>Payment Details</h6>
                  <p><strong>Subtotal:</strong> ₹{Number(pricePerPerson) * Number(guestSize)}</p>
                  <p><strong>Service Fee:</strong> ₹{serviceFee}</p>
                  <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                </ListGroupItem>
              </ListGroup>
            </div>

            {/* Back to Home Button */}
            <Button className="btn primary__btn mt-4">
              <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
                Back to Home
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
