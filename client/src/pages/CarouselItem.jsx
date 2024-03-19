import React from "react";

const CarouselItem = ({ item }) => {
  // Render media based on the type
  const renderVisual = (visual) => {
    // Check if the visual is defined
    if (visual) {
      const fileType = visual.split(".").pop();
      if (fileType.match(/mp4|webm|ogg/)) {
        // Render video if it's a video file
        return (
          <video className="carousel-visual" controls>
            <source src={visual} type={`video/${fileType}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        // Render image by default
        return <img className="carousel-visual" src={visual} alt="" />;
      }
    }
    return null;
  };

  return (
    <div className="carousel-item">
      {renderVisual(item.visual)}
      <div
        className="carousel-item-head"
        dangerouslySetInnerHTML={{ __html: item.header }}
      />
      <div
        className="carousel-item-body"
        dangerouslySetInnerHTML={{ __html: item.body }}
      />
    </div>
  );
};

export default CarouselItem;
