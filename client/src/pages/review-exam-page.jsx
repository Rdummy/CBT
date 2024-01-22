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
import { useLocation } from "react-router-dom";

// const fileToDataUri = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       resolve(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   });

const ReviewExamPage = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);

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

  // const items = [
  //   {
  //     header: "Strong Passwords",
  //     body: " Ensure your online accounts are protected with strong, unique passwords. Use upper- and lower-case letters, numbers, and symbols. Avoid using easily guessable information like birthdays or common words.",
  //     visual: computerTraining,
  //   },
  //   {
  //     header: "Two-Factor Authentication (2FA)",
  //     body: "Whenever possible, enable 2FA for your accounts. It provides an extra layer of security by requiring you to enter a code sent to your mobile device or email when logging in.",
  //     visual: cyberlock,
  //   },
  //   {
  //     header: "Phishing Awareness",
  //     body: " Be cautious of unsolicited emails, texts, or messages. Phishing attacks often use deceptive tactics to trick you into revealing personal information or clicking malicious links. If something looks suspicious, verify its legitimacy with the sender.",
  //     visual: phishing,
  //   },
  //   {
  //     header: "Update Your Software",
  //     body: "Keep your operating system, antivirus software, and applications up to date. Developers release updates to patch security vulnerabilities that cybercriminals could exploit.",
  //     visual: SoftwareUpdates,
  //   },
  //   {
  //     header: "Secure Wifi",
  //     body: "Use a strong password for your Wi-Fi network and avoid using default router passwords. Additionally, consider setting up a separate network for guests to prevent them from accessing your devices.",
  //     visual: "/src/assets/Media/secure-wi-fi.jpg",
  //   },
  // ];

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
          {/* <div className="div">
            <ReturnDashboard />
          </div>{" "} */}
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
                href={isLastSlide ? "/dashboard/exams/:examId/take-exam" : "#"}
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
