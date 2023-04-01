import { useEffect, useState } from "react";
import NoteModel from "./models/noteModel";
import { Note } from "./component/Note";
import { GenericForm } from "./component/GenericForm";
import { NavBar } from './component/NavBar';
import * as notesApi from "./network/note_api";
import * as usersApi from "./network/user_api";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [noteDialog, setNoteDialog] = useState(false);
    const [notToEdit, setNotToEdit] = useState<NoteModel | null>(null)
    const [noteLoading, setNoteLoading] = useState(false)
    const [noteLoadingError, setNoteLoadingError] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [userName, setUserName] = useState("")
    const [formType, setFormType] = useState("")
    useEffect(() => {
        async function userNotes() {
            try {
                const authuser = await usersApi.getLoggedInUser();
                console.log(authuser.username)
                if (authuser.username) {
                    setNoteLoading(true)
                    setUserName(authuser.username)
                    setAuthenticated(true)
                    setNoteLoadingError(false)
                    try {
                        const notes = await notesApi.fetchNotes();
                        setNotes(notes);
                    } catch (error) {
                        setNoteLoadingError(true)
                    }
                    finally {
                        setNoteLoading(false)
                    }
                } else {
                    setAuthenticated(false)
                    setNoteLoading(false)

                }
            } catch (error) {
                console.error(error)
            }

        }
        userNotes();
    }, []);
    return (
        <div className="container">
            <NavBar
                authenticated={authenticated}
                username={userName}
                loginClicked={() => {
                    setFormType("login")
                    setNoteDialog((prev) => !prev);
                }}
                logoutClicked={() => { }}
                signupClick={() => {
                    setFormType("signup")
                    setNoteDialog((prev) => !prev);
                }} />
            {!authenticated && <p>Log In to See Your Notes</p>}
            {!noteLoading && !noteLoadingError && authenticated && <button
                className="addNote"
                onClick={() => {
                    setFormType("add")
                    setNoteDialog((prev) => !prev);
                }}>
                ✙ Add Note
            </button>}
            {noteLoading && <ClipLoader color="#6cb1e3" size={60} />}
            {noteLoadingError && <p>Something went wrong. pls refresh the page or try later</p>}
            {!noteLoading && !noteLoadingError && authenticated && <> {notes.length > 0 ?
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
                                setFormType("edit")
                                setNotToEdit(note)
                                setNoteDialog((prev) => !prev);
                            }}
                        />
                    ))}
                </div>
                : <p>You don't have Notes yet. </p>}
            </>}
            {noteDialog && (<GenericForm
                formType={formType}
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
                }

                }
                onAuthentication={(x: boolean) => { setAuthenticated(x) }}
            />
            )}
        </div>
    );
}

export default App;
