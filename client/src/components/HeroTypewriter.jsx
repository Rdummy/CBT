import React, { useState, useEffect } from "react";

const HeroTypewriter = () => {
  const [typedText, setTypedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const typedStrings = ["Examination", "Training", "Hiring", "Test"];

  

  useEffect(() => {
    const typingInterval = setTimeout(() => {
      if (currentCharIndex === typedStrings[currentIndex]?.length) {
        setCurrentIndex((currentIndex + 1) % typedStrings.length);
        setTypedText("");
        setCurrentCharIndex(0);
      } else if (currentCharIndex < typedStrings[currentIndex]?.length) {
        setTypedText(
          typedText + typedStrings[currentIndex].charAt(currentCharIndex)
        );
        setCurrentCharIndex(currentCharIndex + 1);
      }
    }, 150);

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
