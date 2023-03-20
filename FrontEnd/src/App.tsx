import { useEffect, useState } from "react";
import NoteModel from "./models/noteModel";
import { Note } from "./component/Note";
import "./styles/style.css";
import * as notesApi from "./network/note_api";
import { NoteDialog } from "./component/NoteDialog";
function App() {
  const [notes, setNote] = useState<NoteModel[]>([]);
  const [noteDialog, setNoteDialog] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await notesApi.fetchNotes();
        setNote(notes);
      } catch (error) {
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="container">
      <button className="addNote" onClick={() => setNoteDialog(!noteDialog)}>
        Add Note
      </button>
      <div className="notePad">
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>
      <NoteDialog show={noteDialog} />
    </div>
  );
}

export default App;
