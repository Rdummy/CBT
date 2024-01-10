import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import ReturnDashboard from "../components/ReturnDashboard";
import "../assets/styles/review-exam-page.css";
import Navbar from "../components/Navbar";

const ReviewExamPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      header: "Strong Passwords",
      body: " Ensure your online accounts are protected with strong, unique passwords. Use upper- and lower-case letters, numbers, and symbols. Avoid using easily guessable information like birthdays or common words.",
      visual: "src/assets/Media/cyberlock.jpg",
    },

    {
      header: "Two-Factor Authentication (2FA)",
      body: "Whenever possible, enable 2FA for your accounts. It provides an extra layer of security by requiring you to enter a code sent to your mobile device or email when logging in.",
      visual: "src/assets/Media/computer_training.png",
    },
    {
      header: "Phishing Awareness",
      body: " Be cautious of unsolicited emails, texts, or messages. Phishing attacks often use deceptive tactics to trick you into revealing personal information or clicking malicious links. If something looks suspicious, verify its legitimacy with the sender.",
      visual: "src/assets/Media/Phishing-Awareness.jpg",
    },
    {
      header: "Update Your Software",
      body: "Keep your operating system, antivirus software, and applications up to date. Developers release updates to patch security vulnerabilities that cybercriminals could exploit.",
      visual: "src/assets/Media/SoftwareUpdates.png",
    },
    {
      header: "Secure Wifi",
      body: "Use a strong password for your Wi-Fi network and avoid using default router passwords. Additionally, consider setting up a separate network for guests to prevent them from accessing your devices.",
      visual: "/src/assets/Media/secure-wi-fi.jpg",
    },
  ];

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
          boxShadow: "0 0 10px black;",
          border: "0.1rem solid #a4a4a4",
        }}
      ></div>
      <div className="review-page--wrapper">
        <div className="carousel">
          <ReturnDashboard />
          <div
            className="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {items.map((item) => {
              return <CarouselItem item={item} width={"100%"} />;
            })}
          </div>

          <div className="carousel-buttons">
            <button
              className="button-arrow"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
            </button>
            <div className="indicators">
              {items.map((item, index) => {
                return (
                  <button
                    className="indicator-buttons"
                    onClick={() => {
                      updateIndex(index);
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
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>
          </div>
        </div>
        {/* 2nd Item */}
      </div>
    </>
  );
};

export default ReviewExamPage;
