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

export async function createNote(input: noteInput): Promise<Note[]> {
  const response = await fetchData("http://localhost:5000/notes", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.json();
}
