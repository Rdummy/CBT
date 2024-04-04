import React, { useState } from "react";
import Modal from "./Modal";
import DOMPurify from "dompurify";

function Card({ card, editCard, deleteCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderMediaPreview = (mediaArray) => {
   
    return mediaArray.map((mediaItem, index) => {
      const mediaType = mediaItem.type.split("/")[0]; 

      switch (mediaType) {
        case "image":
          return (
            <img
              key={index}
              src={mediaItem.url}
              alt={`Media content ${index}`}
              className="card-media-image"
            />
          );
        case "video":
          return (
            <video
              key={index}
              src={mediaItem.url}
              controls
              className="card-media-video"
            >
              Your browser does not support the video tag.
            </video>
          );
        case "application": 
          return (
            <div key={index} className="card-media-ppt">
              <img
                src="/public/ppt-icon.png"
                alt={`PowerPoint content ${index}`}
                className="card-ppt-preview"
              />
              <span className="card-ppt-filename">{mediaItem.fileName}</span>
            </div>
          );
        default:
          return <div key={index}>Unsupported media type</div>;
      }
    });
  };

  return (
    <>
      <div className="card-container">
        <h3
          className="card-title"
          dangerouslySetInnerHTML={createMarkup(card.title)}
        ></h3>
        {Array.isArray(card.media) && card.media.length ? (
          renderMediaPreview(card.media)
        ) : (
          <div>No Media Provided</div>
        )}
        <div
          className="card-description"
          dangerouslySetInnerHTML={createMarkup(card.description)}
        ></div>
        <div>
          <button onClick={toggleModal} className="card-button">
            View Details
          </button>
          <button
            onClick={() => editCard(card.id)}
            className="card-button card-button-edit"
          >
            Edit
          </button>
          <button onClick={() => deleteCard(card.id)} className="card-button">
            Delete
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 dangerouslySetInnerHTML={createMarkup(card.title)}></h2>
        {Array.isArray(card.media) && card.media.length ? (
          renderMediaPreview(card.media)
        ) : (
          <div>No Media Provided</div>
        )}
        <div dangerouslySetInnerHTML={createMarkup(card.description)}></div>
      </Modal>
    </>
  );
}

export default Card;
