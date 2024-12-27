import React, { useRef, useState } from "react";
import "./../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from "../shared/Newsletter";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const usernameRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const [error, setError] = useState(null);

  // Static data (to be replaced by API data in production)
  const tour = tourData.find((tour) => tour.id === id);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;
    const username = usernameRef.current.value;

    if (!tourRating || !reviewText || !username) {
      setError("Please provide a username, rating, and review.");
      return;
    }

    const reviewData = {
      username,
      rating: tourRating,
      reviewText,
      tourId: id, // ID of the tour
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/review/67606f0a51a18476fae61515`,
        reviewData
      );
      console.log("Review submitted successfully:", response.data);
      reviewMsgRef.current.value = ""; // Clear input
      usernameRef.current.value = ""; // Clear username
      setTourRating(null); // Reset rating
      setError(null); // Clear errors
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i>{address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="ri-map-pin-2-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>${price} / per person</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/*================== Tour Reviews Section =================== */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="review__input mb-3">
                      <input
                        type="text"
                        ref={usernameRef}
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setTourRating(star)}
                          style={{
                            cursor: "pointer",
                            color: tourRating >= star ? "gold" : "gray",
                          }}
                        >
                          {star}<i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  {error && <p className="text-danger mt-2">{error}</p>}

                  <ListGroup className="user__reviews">
                    {reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>{new Date('07-23-2024').toLocaleDateString("en-US", options)}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}<i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/*================== Tour Reviews Section End =================== */}
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
