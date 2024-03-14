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
      <AddNote handleAddnote={handleAddnote} />
      {noted.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          description={note.description}
          imageUrl={note.imageUrl}
          handleDeletenote={handleDeletenote}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
