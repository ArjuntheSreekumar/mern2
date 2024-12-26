import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* ====================== Hero Section Start ===================== */}
      <section className="hero">
        <Container>
          <Row className="align-items-center text-center text-lg-start">
            <Col lg="6" md="6">
              <h1 className="hero__title">
                Discover Your Next Adventure 
              </h1>
              <p className="hero__text">
                Experience the world's most beautiful destinations with our expertly crafted tours. Unleash your wanderlust today!
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ====================== Hero Section End ===================== */}

      {/* ====================== Featured Tour Section Start ============= */}
      <section className="featured__tours">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ====================== Featured Tour Section End ============= */}

      {/* ====================== Newsletter Section ===================== */}
      <Newsletter />
    </>
  );
};

export default Home;
