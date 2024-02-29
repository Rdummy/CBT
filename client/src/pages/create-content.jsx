import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import NotesList from "../components/Create Content Components/NotesList";
import ViewCarousel from "../components/Create Content Components/ViewCarousel";
import Search from "../components/Create Content Components/Search";
import "../assets/styles/create-content.css";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";

function CreateContent() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useState("notes");
  const navigate = useNavigate();
  const { examId } = useParams();

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
    setNotes([...updatedNotes]);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const saveContent = async () => {
    try {
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

      const slideData = {
        reviewerContent: {
          slides: notes.map((note) => ({
            title: note.title,
            description: note.description,
            imageUrl: note.imageUrl,
          })),
        },
      };

      const response = await axios.put(
        `http://localhost:3001/create-content/slides/${examId}`,
        slideData
      );

      console.log(response.data);

      setNotes([]);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving content:", error.message);
    }
  };

  return (
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
