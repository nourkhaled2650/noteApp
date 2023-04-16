import { useForm } from "react-hook-form";
import Note, { noteInput, userInput } from "../models/noteModel";
import { createNote, updateNote } from "../network/note_api";
import { getLoggedInUser, logIn, signUp } from "../network/user_api";
import "./dialogStyle.css";
import { FormTitle } from "./FormTitle";
import { FormBody } from "./FormBody";

interface formProps {
    onDismiss: () => void;
    onNoteSave: (note: Note, updated: boolean) => void;
    noteToEdit?: Note | null;
    formType: string;
    onAuthentication: (x: boolean) => void;
}
export const GenericForm = ({ onDismiss, onNoteSave, noteToEdit, formType, onAuthentication }: formProps) => {

    const { register, handleSubmit, formState: { errors }, } = useForm<noteInput>({
        defaultValues: {
            title: noteToEdit?.title,
            text: noteToEdit?.text
        }
    });
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm<userInput>({})

    //note onsubmit
    const onNoteSubmit = async (data: noteInput) => {
        try {
            const user = await getLoggedInUser();
            let response;
            if (!noteToEdit?._id) {
                response = await createNote(data, user.username);
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
    //user onsubmit

    const onUserSubmit = async (data: userInput) => {
        try {
            let response;
            if (typeof data.Email !== 'undefined') {
                response = await signUp({ username: data.Username, email: data.Email, password: data.Password })
            } else {
                response = await logIn({ username: data.Username, password: data.Password })
            }
            onAuthentication(true)
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


            {(formType == "update" || formType == "add") ?
                <form
                    onSubmit={handleSubmit((data) => onNoteSubmit(data))}
                    className="formContainer"
                >
                    <div className="header">
                        <FormTitle formType={formType} />
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
                        <FormBody
                            name="title"
                            register={register}
                            registerOptions={{
                                required: { value: true, message: "Note must have a Title" },
                            }}
                            error={errors.title}
                        />
                        <FormBody
                            name="text"
                            register={register}
                            textarea={true}
                        />
                        <div className="footer">
                            <input type="submit" value="Save" className="addNote" />
                        </div>
                    </div>
                </form> :
                <form
                    onSubmit={handleSubmit2((data) => onUserSubmit(data))}
                    className="formContainer"
                >
                    <div className="header">
                        <FormTitle formType={formType} />
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
                        <FormBody
                            name="Username"
                            register={register2}
                            registerOptions={{
                                required: { value: true, message: "Username is required" },
                            }}
                            error={errors2.Username}
                        />
                        {(formType == "signup") ?
                            <FormBody
                                name="Email"
                                register={register2}
                                registerOptions={{
                                    required: { value: true, message: "Email is required" },
                                }}
                                error={errors2.Email}
                            />
                            : ""}
                        <FormBody
                            name="Password"
                            register={register2}
                            registerOptions={{
                                required: { value: true, message: "Password is required" },
                            }}
                            error={errors2.Password}
                            inputType="password" />
                        <div className="footer">
                            {(formType == "signup") ? <input type="submit" value="Sign Up" className="addNote" /> :
                                <input type="submit" value="Log In" className="addNote" />}
                        </div>
                    </div>
                </form>
            }
        </div>
    )
};
