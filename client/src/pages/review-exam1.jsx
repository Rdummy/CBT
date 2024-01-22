import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselItem from "./CarouselItem";
import ReturnDashboard from "../components/ReturnDashboard";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";

const ReviewExamPage1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/create-content/slides"
        ); // Update the endpoint
        setItems(response.data.slides);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isLastSlide = activeIndex === items.length - 1;

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <>
      <Navbar />
      <div
        className="return--wrapper"
        style={{
          backgroundColor: "#ddd",
          boxShadow: "0 0 10px black",
        }}
      ></div>

      <div className="review-page--wrapper">
        <div
          className="carousel"
          style={{ width: "100%", display: "flex", height: "100%" }}
        >
          <div className="div">
            <ReturnDashboard />
          </div>{" "}
          <div
            className="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              items.map((item, index) => (
                <CarouselItem key={index} item={item} width={"100%"} />
              ))
            )}
          </div>
          <div className="carousel-buttons">
            <button
              className="button-arrow"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>{" "}
            </button>

            <div className="indicators">
              {items.map((item, index) => (
                <button
                  key={index}
                  className="indicator-buttons"
                  onClick={() => {
                    if (index !== activeIndex) {
                      updateIndex(index);
                    }
                  }}
                >
                  <span
                    className={`material-symbols-outlined ${
                      index === activeIndex
                        ? "indicator-symbol-active"
                        : "indicator-symbol"
                    }`}
                  >
                    radio_button_checked
                  </span>
                </button>
              ))}
            </div>
            <button
              className="button-arrow"
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            >
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
              <Button
                href={isLastSlide ? "/dashboard/exams/:examId/take-exam" : "#"}
                className={`brand-red-bg ${!isLastSlide && "disabled"}`}
                sx={{
                  textTransform: "capitalize",
                  px: 3,
                  py: 2,
                  mx: 0.5,
                  opacity: isLastSlide ? 1 : 0.5,
                  cursor: isLastSlide ? "pointer" : "not-allowed",
                }}
                disabled={!isLastSlide}
              >
                Take Exam
              </Button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewExamPage1;
