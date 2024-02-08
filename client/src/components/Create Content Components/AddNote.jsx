// AddNote.jsx
import { useState } from "react";

const AddNote = ({ handleAddnote }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const characterLimit = 1000;
  const maxImageSizeMB = 5; // Adjust the maximum image size as needed
  const maxImageWidth = 400; // Adjust the maximum displayed image width as needed
  const maxImageHeight = 200; // Adjust the maximum displayed image height as needed

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
      const imageSizeInMB = file.size / (1024 * 1024); // Convert to MB
      if (imageSizeInMB <= maxImageSizeMB) {
        setImagePreview(reader.result);
        // Save the image data to localStorage
        localStorage.setItem("imagePreview", reader.result);
      } else {
        alert(`Image size exceeds the maximum limit of ${maxImageSizeMB} MB.`);
      }
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
        style={{
          width: "100%",

          display: "flex",
        }}
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
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            marginLeft: "10px",
            maxWidth: `${maxImageWidth}px`,
            maxHeight: `${maxImageHeight}px`,
          }}
        />
      )}

      {/* description text area */}
      <textarea
        className="add-description"
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteDesc}
        onChange={handleChangeDesc}
        style={{ height: "120px" }}
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
