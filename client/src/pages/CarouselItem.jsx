import React from "react";

const CarouselItem = ({ item }) => {
 
  const renderVisual = (visual) => {
   
    if (visual) {
      const fileType = visual.split(".").pop();
      if (fileType.match(/mp4|webm|ogg/)) {
        
        return (
          <video className="carousel-visual" controls>
            <source src={visual} type={`video/${fileType}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        
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
