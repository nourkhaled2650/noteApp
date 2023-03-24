import { useForm } from "react-hook-form";
import Note, { noteInput } from "../models/noteModel";
import { createNote, updateNote } from "../network/note_api";
import "./dialogStyle.css";

interface dialogProps {
    onDismiss: () => void;
    onNoteSave: (note: Note, updated: boolean) => void;
    noteToEdit?: Note
}
export const NoteDialog = ({ onDismiss, onNoteSave, noteToEdit }: dialogProps) => {

    const { register, handleSubmit, formState: { errors }, } = useForm<noteInput>({
        defaultValues: {
            title: noteToEdit?.title,
            text: noteToEdit?.text
        }
    });

    const onSubmit = async (data: noteInput) => {
        try {
            let response;
            if (!noteToEdit?._id) {
                response = await createNote(data);
                onNoteSave(response, false);
            } else {
                const response = await updateNote(data, noteToEdit._id)
                onNoteSave(response, true);
            }
            onDismiss();
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <div
                className="popUp"
                onClick={() => {
                    onDismiss();
                }}
            ></div>
            <form
                onSubmit={handleSubmit((data) => onSubmit(data))}
                className="formContainer"
            >
                <div className="header">
                    <h1>{noteToEdit?._id ? "Update Note" : "Add Notes"}</h1>
                    <span
                        className="close"
                        onClick={() => {
                            onDismiss();
                        }}
                    >
                        &times;
                    </span>
                </div>
                <div className="formBody">
                    <label htmlFor="title" className="">
                        Title
                    </label>
                    <input
                        {...register("title", {
                            required: { value: true, message: "Note must have a Title" },
                        })}
                        type="text"
                        placeholder="title"
                    />
                    <p className="invalidMsg">{errors.title?.message}</p>
                    <label htmlFor="text">Text</label>
                    <textarea {...register("text")} rows={7} placeholder="text" />
                    <div className="footer">
                        <input type="submit" value="Save" className="addNote" />
                    </div>
                </div>
            </form>
        </div>
    );
};
