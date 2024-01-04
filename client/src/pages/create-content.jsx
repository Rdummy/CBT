import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "../components/Create Content Components/NotesList";
import ViewCarousel from "../components/Create Content Components/ViewCarousel";
import Search from "../components/Create Content Components/Search";
import ReturnDashboard from "../components/ReturnDashboard";
import "../assets/styles/create-content.css";

function CreateContent() {
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState("");
  // Load data from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    const storedTopic = localStorage.getItem("topic");

    if (storedNotes) {
      setNotes(storedNotes);
    }

    if (storedTopic) {
      setTopic(storedTopic);
    }
  }, []); // Empty dependency array to run only on mount

  // Save data to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("topic", topic);
  }, [topic]);

  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useState("notes");

  const addAnote = (title, description, imageUrl) => {
    const newNote = {
      id: nanoid(),
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

  return (
    <div className="container">
      <h1>CONTENT CREATOR</h1>
      {/* <textarea
        className="add-topic"
        cols="50"
        placeholder="Type to add a Topic title..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      ></textarea> */}
      <div className="toggle-button">
        <button onClick={() => setDisplayMode("notes")}>Show Notes</button>
        <button onClick={() => setDisplayMode("carousel")}>Show Slides</button>
        <button>Save Content</button>
        {/* <button>Show Content</button> */}
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
          handleEditNote={handleEditNote} // Ensure it's correctly passed
        />
      ) : (
        <ViewCarousel notes={notes} />
      )}
    </div>
  );
}
export default CreateContent;
