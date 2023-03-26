import { useEffect, useState } from "react";
import NoteModel from "./models/noteModel";
import { Note } from "./component/Note";
import { NoteDialog } from "./component/NoteDialog";
import * as notesApi from "./network/note_api";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [noteDialog, setNoteDialog] = useState(false);
    const [notToEdit, setNotToEdit] = useState<NoteModel | null>(null)
    const [noteLoading, setNoteLoading] = useState(true)
    const [noteLoadingError, setNoteLoadingError] = useState(false)
    useEffect(() => {
        async function loadNotes() {
            try {
                setNoteLoading(true)
                setNoteLoadingError(false)
                const notes = await notesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                setNoteLoadingError(true)
            }
            finally {
                setNoteLoading(false)
            }
        }
        loadNotes();
    }, []);

    return (
        <div className="container">
            <button
                className="addNote"
                onClick={() => { setNoteDialog((prev) => !prev); }}>
                ✙ Add Note
            </button>
            {noteLoading && <ClipLoader color="#6cb1e3" size={60} />}
            {noteLoadingError && <p>Something went wrong. pls refresh the page or try later</p>}
            {!noteLoading && !noteLoadingError &&
                <>
                    {notes.length > 0 ?
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
                        : <p>You don't have Notes yet. </p>}
                </>}
            {noteDialog && (
                <NoteDialog
                    noteToEdit={notToEdit}
                    onDismiss={() => {
                        setNoteDialog((prev) => !prev)
                        setNotToEdit(null)
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
