import Note, { noteInput } from "./../models/noteModel";
import { fetchData } from "./fetchh";

export async function fetchNotes(username: string): Promise<Note[]> {
  const response = await fetchData(
    "http://localhost:5000/notes/" + "?username=" + username,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    }
  );

  const notes = await response.json();
  return notes;
}

export async function updateNote(
  input: noteInput,
  noteId: string
): Promise<Note> {
  const response = await fetchData("http://localhost:5000/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function createNote(
  note: noteInput,
  username: string
): Promise<Note> {
  note.username = username;
  const response = await fetchData("http://localhost:5000/notes", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData("http://localhost:5000/notes/" + noteId, {
    method: "DELETE",
  });
}
