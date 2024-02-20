import React, { useEffect, useMemo, useState } from "react";
import CarouselItem from "./CarouselItem";
import ReturnDashboard from "../components/ReturnDashboard";
import "../assets/styles/review-exam-page.css";
import Navbar from "../components/Navbar";
import computerTraining from "../assets/Media/computer_training.png";
import cyberlock from "../assets/Media/cyberlock.jpg";
import phishing from "../assets/Media/Phishing-Awareness.jpg";
import SoftwareUpdates from "../assets/Media/SoftwareUpdates.png";
import Button from "@mui/material/Button";
import { useLocation, useParams } from "react-router-dom";

const ReviewExamPage = () => {
  const location = useLocation();
  const { examId } = useParams();
  const reviewState = location.state;
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (reviewState?.retake) {
      // Logic to handle the page as a retake review
      // This might include setting up the state to allow the user to review their answers before retaking
    }
    // Any additional setup based on passed state
  }, [reviewState, examId]);

  useEffect(() => {
    try {
      // Check if location.state is available and not null
      if (location.state?.details?.reviewerContent?.slides) {
        const slides = location.state.details.reviewerContent.slides;

        // Ensure slides is an array before attempting to map
        if (Array.isArray(slides)) {
          const data = slides.map((item) => ({
            header: item.title,
            body: item.description,
            visual: item.imageUrl,
          }));
          setItems(data);
        } else {
          console.error("Slides is not an array:", slides);
        }
      } else {
        throw new Error("Invalid or missing data in location.state");
        // Handle the case where location.state is null or missing
        // For example, redirect the user to a default page or show an error message
      }
    } catch (error) {
      console.error("Error in useEffect:", error.message);
      // Handle the error gracefully, show a user-friendly message, etc.
    }
  }, [location.state]);

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
          <div
            className="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => {
              // Add a unique key prop to each rendered CarouselItem
              return <CarouselItem key={index} item={item} width={"100%"} />;
            })}
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
              {items.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="indicator-buttons"
                    onClick={() => {
                      // Add a condition to prevent moving the radio buttons
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
                );
              })}
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
                href={
                  isLastSlide ? `/dashboard/exams/${examId}/take-exam` : "#"
                }
                className={`brand-red-bg ${!isLastSlide && "disabled"}`}
                sx={{
                  textTransform: "capitalize",
                  px: 3,
                  py: 2,
                  mx: 0.5,
                  opacity: isLastSlide ? 1 : 0.5, // Set opacity when disabled
                  cursor: isLastSlide ? "pointer" : "not-allowed", // Set cursor when disabled
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

export default ReviewExamPage;
