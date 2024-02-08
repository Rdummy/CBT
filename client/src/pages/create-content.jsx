import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"; // Import Axios library
import NotesList from "../components/Create Content Components/NotesList";
import ViewCarousel from "../components/Create Content Components/ViewCarousel";
import Search from "../components/Create Content Components/Search";
import "../assets/styles/create-content.css";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

function CreateContent() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useState("notes");
  const navigate = useNavigate();

  const addAnote = (title, description, imageUrl) => {
    const newNote = {
      id: uuidv4(),
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

    setNotes([...updatedNotes]); // Use spread operator to create a new array
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
    // <div className="exam-details--wrapper">
    <Card sx={{ height: "100%", width: "70vw", m: 2 }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "50px",
          marginTop: "10px",
        }}
      >
        Create Content
      </h2>
      <div className="toggle-button">
        <button
          style={{ height: "60px", width: "150px" }}
          onClick={() => setDisplayMode("notes")}
        >
          Show Notes
        </button>
        <button
          style={{ height: "60px", width: "150px" }}
          onClick={() => setDisplayMode("carousel")}
        >
          Show Slides
        </button>
        <button
          style={{ height: "60px", width: "150px" }}
          onClick={saveContent}
        >
          Save Content
        </button>
      </div>

      <Search handleSearchNote={setSearchText} />

      {displayMode === "notes" ? (
        <NotesList
          sx={{ marginBottom: "20px" }}
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
    </Card>
    // </div>
  );
}

export default CreateContent;
