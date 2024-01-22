// AddNote.jsx
import { useState } from "react";

const AddNote = ({ handleAddnote }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const characterLimit = 200;

  const handleChangetitle = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteDesc(event.target.value);
    }
  };

  const handleImgClick = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      // Save the image data to localStorage
      localStorage.setItem("imagePreview", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveClick = () => {
    if (noteTitle && noteDesc.trim().length > 0) {
      // Retrieve the image data from localStorage
      const storedImagePreview = localStorage.getItem("imagePreview");
      handleAddnote(noteTitle, noteDesc, storedImagePreview);
      setNoteTitle("");
      setNoteDesc("");
      setImagePreview(""); // Clear the image preview
      // Optionally, you may choose to keep the image data in localStorage
      localStorage.removeItem("imagePreview");
    }
  };

  return (
    <div className="new">
      {/* title text area */}
      <textarea
        className="add-title"
        rows="8"
        cols="10"
        placeholder="Type to add a title or header..."
        value={noteTitle}
        onChange={handleChangetitle}
      ></textarea>

      {/* image upload */}
      <input
        className="add-image"
        type="file"
        accept="image/*"
        onChange={handleImgClick}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" />}

      {/* description text area */}
      <textarea
        className="add-description"
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteDesc}
        onChange={handleChangeDesc}
      ></textarea>

      <div className="note-footer footer">
        <small>{characterLimit - noteDesc.length} Remaining</small>

        {/* Save Button */}
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
