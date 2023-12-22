// NotesList.jsx
import Note from "./Note";
import AddNote from "./AddNote";

const NoteList = ({
  noted,
  handleAddnote,
  handleDeletenote,
  handleEditNote,
}) => {
  return (
    <div className="notes-list">
      {noted.map((note) => (
        <Note
          key={note.id} // Add a unique key prop
          id={note.id}
          title={note.title}
          description={note.description}
          imageUrl={note.imageUrl}
          handleDeletenote={handleDeletenote}
          handleEditNote={handleEditNote}
        />
      ))}
      <AddNote handleAddnote={handleAddnote} />
    </div>
  );
};

export default NoteList;
