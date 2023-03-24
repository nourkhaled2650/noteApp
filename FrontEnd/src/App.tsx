import { useEffect, useState } from "react";
import NoteModel from "./models/noteModel";
import { Note } from "./component/Note";
import { NoteDialog } from "./component/NoteDialog";
import * as notesApi from "./network/note_api";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [noteDialog, setNoteDialog] = useState(false);
    const [notToEdit, setNotToEdit] = useState<NoteModel>({ title: "", text: "", _id: "", createdAt: "", updatedAt: "" })
    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await notesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                alert(error);
            }
        }
        loadNotes();
    }, []);

    return (
        <div className="container">
            <button
                className="addNote"
                onClick={() => {

                    setNoteDialog((prev) => !prev);
                }}
            >
                ✙ Add Note
            </button>
            <div className="notePad">
                {notes.map((note) => (
                    <Note
                        note={note}
                        key={note._id}
                        onDeleteNoteClicked={() => {
                            setNotes(
                                notes.filter((existingNote) => existingNote._id != note._id)
                            );
                        }}
                        onEditNoteClicked={() => {
                            setNotToEdit(note)
                            setNoteDialog((prev) => !prev);
                        }}
                    />
                ))}
            </div>
            {noteDialog && (
                <NoteDialog
                    noteToEdit={notToEdit}
                    onDismiss={() => {
                        setNoteDialog((prev) => !prev)
                        setNotToEdit({ _id: "", title: "", text: "", createdAt: "", updatedAt: "" })
                    }}
                    onNoteSave={(newNote, updated) => {
                        if (updated) {
                            setNotes(notes.map((note) => note._id === newNote._id ? newNote : note))
                        }
                        else {
                            setNotes([...notes, newNote]);
                        }



                    }}
                />
            )}
        </div>
    );
}

export default App;
