import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateCardForm({ addCard }) {
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState({ file: null, type: "", fileName: "" });
  const [description, setDescription] = useState("");
  const fileInputRef = useRef();

  // Custom configuration for CKEditor to limit the toolbar items
  const editorConfiguration = {
    toolbar: ["Undo", "Redo", "Heading", "bold", "italic"],
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia({
        file: file,
        type: file.type,
        fileName: file.name,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new card object
    const cardData = {
      title,
      media: media.file
        ? {
            type: media.type,
            url: URL.createObjectURL(media.file),
            fileName: media.fileName,
          }
        : null, // Handle the case where media might not be provided
      description,
    };

    addCard(cardData);
    setTitle("");
    setMedia({ file: null, type: "", fileName: "" });
    setDescription("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-card-form">
      <div className="create-title">
        <label>Title</label>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={title}
          onChange={(event, editor) => {
            const data = editor.getData();
            setTitle(data);
          }}
        />
      </div>
      <div className="create-media">
        <label>Media (images, videos, PPT)</label>
        <input
          type="file"
          onChange={handleMediaChange}
          accept="image/*,video/*,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          ref={fileInputRef}
        />
      </div>
      <div className="create-description">
        <label>Description (max 100 words)</label>
        <CKEditor
          editor={ClassicEditor}
          data={description}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
        />
      </div>
      <button type="submit">Create Slide Card</button>
    </form>
  );
}

export default CreateCardForm;
