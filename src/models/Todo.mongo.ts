import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Todo = model("Todo", TodoSchema);
