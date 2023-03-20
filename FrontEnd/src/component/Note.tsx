import React from "react";
import notemodel from "../models/noteModel";
import "../styles/style.css";

import { formateDate } from "../util/formatDate";
interface noteProps {
  note: notemodel;
}
export const Note = ({ note }: noteProps) => (
  <div className="noteContainer">
    <div className="noteBody">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </div>
    <footer>
      {note.updatedAt > note.createdAt ? "Updated " : "Created "}
      {formateDate(note.updatedAt)}
    </footer>
  </div>
);
