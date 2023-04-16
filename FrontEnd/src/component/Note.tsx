import React, { useState } from "react";
import noteModel, { noteInput } from "../models/noteModel";
import "./NoteStyle.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { formateDate } from "../util/formatDate";
import { deleteNote } from "../network/note_api";

interface noteProps {
    note: noteModel;
    onDeleteNoteClicked: (noteId: string) => void;
    onEditNoteClicked: () => void;
}
export const Note = ({ note, onDeleteNoteClicked, onEditNoteClicked }: noteProps) =>
(
    <div className="noteContainer" onClick={onEditNoteClicked}>
        <div className="noteBody">
            <div className="noteHeader">
                <h3>{note.title}</h3>
                <AiTwotoneDelete
                    size={18}
                    className="trashBin"
                    onClick={async (e) => {
                        e.stopPropagation();
                        console.log(note._id);
                        await deleteNote(note._id);
                        onDeleteNoteClicked(note._id);

                    }}
                />
            </div>
            <p>{note.text}</p>
        </div>
        <footer>
            {note.updatedAt > note.createdAt ? "Updated " : "Created "}
            {formateDate(note.updatedAt)}
        </footer>
    </div>
);
