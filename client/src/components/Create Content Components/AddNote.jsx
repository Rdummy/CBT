
import { useState } from "react";
import imageCompression from "browser-image-compression";

const AddNote = ({ handleAddnote }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const characterLimit = 1000;
  const maxImageSizeMB = 5;
  const maxImageWidth = 400; 
  const maxImageHeight = 200;

  const handleChangetitle = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteDesc(event.target.value);
    }
  };

  const handleImgClick = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 5, 
      maxWidthOrHeight: 1920, 
      useWebWorker: true,
    };

    try {
      console.log(
        "Original File Size:",
        (file.size / 1024 / 1024).toFixed(2) + "MB"
      );
      const compressedFile = await imageCompression(file, options);
      console.log(
        "Compressed File Size:",
        (compressedFile.size / 1024 / 1024).toFixed(2) + "MB"
      );

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        localStorage.setItem("imagePreview", reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveClick = () => {
    if (noteTitle && noteDesc.trim().length > 0) {
      
      const storedImagePreview = localStorage.getItem("imagePreview");
      handleAddnote(noteTitle, noteDesc, storedImagePreview);
      setNoteTitle("");
      setNoteDesc("");
      setImagePreview(""); 
      localStorage.removeItem("imagePreview");
    }
  };

  return (
    <div className="new">
      
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
