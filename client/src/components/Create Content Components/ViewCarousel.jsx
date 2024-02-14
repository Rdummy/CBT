import React, { useState } from "react";

const ViewCarousel = ({ notes }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = notes.map((note) => ({
    header: note.title,
    body: note.description,
    visual: note.imageUrl,
  }));
  const CarouselItem = ({ item }) => {
    return (
      <div className="carousel-item">
        {item.visual && (
          <img
            className="carousel-visual"
            src={item.visual}
            alt="Carousel Visual"
          />
        )}
        <div className="carousel-item-head">{item.header}</div>
        <div className="carousel-item-body">{item.body}</div>
      </div>
    );
  };

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item, index) => {
          // Add a unique key prop to CarouselItem component
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
          {items.map((_, index) => (
            <button
              key={index}
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
          ))}
        </div>
        <button
          className="button-arrow"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};
export default ViewCarousel;
