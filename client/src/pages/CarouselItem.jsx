import React from "react";

const CarouselItem = ({ item }) => {
  return (
    <div className="carousel-item">
      <div></div>
      <img className="carousel-visual" src={item.visual} />
      <div className="carousel-item-head">{item.header}</div>
      <div className="carousel-item-body">{item.body}</div>
    </div>
  );
};

export default CarouselItem;
