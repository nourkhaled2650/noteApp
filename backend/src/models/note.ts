import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    username: { type: String, required: true },
  },
  { timestamps: true }
);
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
