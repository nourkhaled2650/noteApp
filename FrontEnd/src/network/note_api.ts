import Note, { noteInput } from "./../models/noteModel";
const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    throw Error("something went wrong");
  }
};

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:5000/notes", {
    method: "GET",
  });
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
export async function createNote(input: noteInput): Promise<Note> {
  const response = await fetchData("http://localhost:5000/notes", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData("http://localhost:5000/notes/" + noteId, {
    method: "DELETE",
  });
}
