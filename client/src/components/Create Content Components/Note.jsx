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

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleChangetitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleSaveClick = () => {
    handleEditNote(id, editedTitle, editedDescription, editedImage);
    setIsEditing(false);
    console.log(setIsEditing);
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
          <input
            className="add-title edit-title"
            value={editedTitle}
            onChange={handleChangetitle}
          />
          <input
            className="add-image edit-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {editedImage && <img src={editedImage} alt="Note Image" />}
          <textarea
            className="add-description edit-desc"
            value={editedDescription}
            onChange={handleChangeDesc}
          ></textarea>
        </>
      ) : (
        <>
          <span className="note-title">{title}</span>
          <span>{description}</span>
          {imageUrl && <img src={imageUrl} alt="Note Image" />}
        </>
      )}
      <div className="note-footer">
        {isEditing ? (
          <div className="edit-footer footer">
            <button className="save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="icon-footer footer">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
