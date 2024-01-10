import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import ReturnDashboard from "../components/ReturnDashboard";
import "../assets/styles/review-exam-page.css";
import Navbar from "../components/Navbar";

const ReviewExamPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      header: "Unraveling the Grammar Puzzle",
      body: "In our exploration of language, understanding grammar becomes paramount. Consider it the backbone of effective communication. Today, we delve into the intricate world of grammar, breaking down its essential components. From parts of speech to sentence structure, we'll demystify the rules that govern language. Prepare to gain insights into how grammar serves as a tool for precision and clarity in expression. By mastering these fundamental principles, you'll lay a robust foundation for fluency.",
      visual: "/src/assets/Media/grammar.png",
    },

    {
      header: "Navigating the Diversity of Language",
      body: "Languages are living entities that evolve within diverse cultures and regions. In this session, we embark on a journey to explore language variation. From dialects that shape regional identities to idioms that add color to expressions, we'll navigate the rich tapestry of linguistic diversity. By understanding these nuances, you'll not only enhance your comprehension skills but also deepen your appreciation for the cultural influences embedded in language. Let's uncover the beauty of linguistic diversity together!",
      visual: "/src/assets/Media/language.png",
    },
    {
      header: "Harnessing the Power of Language Immersion",
      body: "Beyond textbooks and classrooms, language immersion offers a transformative experience. Today, we dive into practical strategies for effective immersion. From engaging with native speakers to incorporating immersive technologies, we'll explore methods that go beyond the conventional. Discover how exposing yourself to real-world language usage can accelerate your learning. By actively living the language, you'll develop a natural, intuitive grasp that extends beyond mere vocabulary acquisition. Get ready to immerse yourself in language and unlock new dimensions of fluency!",
      visual: "/src/assets/Media/immerse.png",
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
