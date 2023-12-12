import React, { useState, useEffect } from "react";

const HeroTypewriter = () => {
  const [typedText, setTypedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current string index
  const typedStrings = ["Examination", "Training", "Hiring", "test"];

  // Use try-catch block to handle potential errors
  // try {
  //   const element = document.querySelector(".typed");
  //   if (element) {
  //     const typedStrings = element.getAttribute("data-typed-items").split(",");
  //   } else {
  //     // Handle missing element scenario
  //     console.error('Element with class ".typed" not found');
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

  useEffect(() => {
    const typingInterval = setTimeout(() => {
      // Check if current string is finished typing
      if (currentCharIndex === typedStrings[currentIndex]?.length) {
        // Update current index and reset typed text
        setCurrentIndex((currentIndex + 1) % typedStrings.length);
        setTypedText("");
        setCurrentCharIndex(0);
      } else if (currentCharIndex < typedStrings[currentIndex]?.length) {
        // Continue typing current string
        setTypedText(
          typedText + typedStrings[currentIndex].charAt(currentCharIndex)
        );
        setCurrentCharIndex(currentCharIndex + 1);
      }
    }, 150); // adjust speed here

    return () => clearTimeout(typingInterval);
  }, [currentCharIndex, typedText, currentIndex]);

  return (
    <section
      id="hero"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div className="hero-container" data-aos="fade-in">
        <h1>Nova Techset</h1>
        <p>
          Computer Based&nbsp;
          {typedText}
        </p>
      </div>
    </section>
  );
};
export default HeroTypewriter;
