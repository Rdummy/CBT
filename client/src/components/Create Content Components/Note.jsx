// Note.jsx
import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Note = ({
  id,
  title,
  description,
  imageUrl,
  handleDeletenote,
  handleEditNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedImage, setEditedImage] = useState(imageUrl);
  const characterLimit = 200;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChangetitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setEditedDescription(event.target.value);
    }
  };

  const handleSaveClick = () => {
    handleEditNote(id, editedTitle, editedDescription, editedImage);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedImage(imageUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setEditedImage(url);
  };

  return (
    <div className={`note ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <textarea
            className="add-title"
            value={editedTitle}
            onChange={handleChangetitle}
          />
          <textarea
            className="add-description"
            value={editedDescription}
            onChange={handleChangeDesc}
          ></textarea>
          <input
            className="add-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {editedImage && <img src={editedImage} alt="Note Image" />}
          <div className="note-footer">
            <small>{characterLimit - editedDescription.length} Remaining</small>
          </div>
        </>
      ) : (
        <>
          <span className="note-title">{title}</span>
          <span>{description}</span>
          {imageUrl && <img src={imageUrl} alt="Note Image" />}
        </>
      )}
      <div className="note-footer footer">
        {isEditing ? (
          <>
            <button className="save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <MdEdit
              onClick={handleEditClick}
              className="edit-icon"
              size="1.3em"
            />
            <MdDeleteForever
              onClick={() => handleDeletenote(id)}
              className="delete-icon"
              size="1.3em"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
