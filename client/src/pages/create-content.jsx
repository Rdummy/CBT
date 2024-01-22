import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import NotesList from "../components/Create Content Components/NotesList";
import ViewCarousel from "../components/Create Content Components/ViewCarousel";
import Search from "../components/Create Content Components/Search";
import "../assets/styles/create-content.css";
import { useNavigate } from "react-router-dom";

function CreateContent() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useState("notes");
  const navigate = useNavigate();

  const addAnote = (title, description, imageUrl) => {
    const newNote = {
      title: title,
      description: description,
      imageUrl: imageUrl,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const handleEditNote = (id, editedTitle, editedDescription, editedImage) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            title: editedTitle,
            description: editedDescription,
            imageUrl: editedImage,
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const saveContent = async () => {
    try {
      // Validate the data before sending (add your own validation logic)
      const isValid = notes.every((note) => {
        return (
          note.title.trim() !== "" &&
          note.description.trim() !== "" &&
          note.imageUrl.trim() !== ""
        );
      });

      if (!isValid) {
        console.warn("Invalid data in notes. Please fill in all fields.");
        return;
      }

      // Transform the frontend data to match the slideSchema in reviewerContent
      const slideData = {
        reviewerContent: {
          slides: notes.map((note) => ({
            title: note.title,
            description: note.description,
            imageUrl: note.imageUrl,
          })),
        },
      };

      // Make a PUT request to update the existing data in MongoDB
      const response = await axios.put(
        "http://localhost:3001/create-content/slides",
        slideData
      );

      console.log(response.data); // Log the server response if needed

      // Optionally, you can reset the notes state after saving
      setNotes([]);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving content:", error.message);
      // Handle the error gracefully, show a user-friendly message, etc.
    }
  };

  return (
    <div className="container">
      <h1>Create Content</h1>
      <div className="toggle-button">
        <button onClick={() => setDisplayMode("notes")}>Show Notes</button>
        <button onClick={() => setDisplayMode("carousel")}>Show Slides</button>
        <button onClick={saveContent}>Save Content</button>
      </div>

      <Search handleSearchNote={setSearchText} />

      {displayMode === "notes" ? (
        <NotesList
          noted={notes.filter(
            (note) =>
              note.title.toLowerCase().includes(searchText) ||
              note.description.toLowerCase().includes(searchText)
          )}
          handleAddnote={addAnote}
          handleDeletenote={deleteNote}
          handleEditNote={handleEditNote}
        />
      ) : (
        <ViewCarousel notes={notes} />
      )}
    </div>
  );
}

export default CreateContent;
