import React, { useState } from "react";
import Modal from "./Modal";
import DOMPurify from "dompurify";

function Card({ card, editCard, deleteCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderMediaPreview = () => {
    if (!card.media) {
      return <div>No Media Provided</div>;
    } else if (card.media.type.startsWith("image")) {
      return (
        <img
          src={card.media.url}
          alt="Media content"
          className="card-media-image" // Use class for styling
        />
      );
    } else if (card.media.type.startsWith("video")) {
      return (
        <video
          src={card.media.url}
          controls
          className="card-media-video" // Use class for styling
        />
      );
    } else if (
      card.media.type.includes("powerpoint") ||
      card.media.type.includes("presentationml")
    ) {
      // Placeholder for PowerPoint files
      return (
        <div className="card-media-ppt">
          <img
            src="/public/ppt-icon.png" // Path to your PowerPoint preview image
            alt="PowerPoint Placeholder"
            className="card-ppt-preview" // Use class for styling
          />
          <span className="card-ppt-filename">{card.media.fileName}</span>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="card-container">
        <h3
          className="card-title"
          dangerouslySetInnerHTML={createMarkup(card.title)}
        ></h3>
        {renderMediaPreview()}
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
        {renderMediaPreview()}
        <div dangerouslySetInnerHTML={createMarkup(card.description)}></div>
        {card.media && card.media.type.includes("powerpoint") ? (
          <p>PowerPoint slideshow would be here.</p> // Placeholder text, replace with your slideshow component
        ) : null}
      </Modal>
    </>
  );
}

export default Card;
