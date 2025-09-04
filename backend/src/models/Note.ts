import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  createdAt: string; 
  updatedAt: string; 
}

export  function getFormattedDate(): string {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const noteSchema: Schema<INote> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: String, default: getFormattedDate },
  updatedAt: { type: String, default: getFormattedDate },
});


noteSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = getFormattedDate();
  }
  this.updatedAt = getFormattedDate();
  next();
});

export default mongoose.model<INote>("Note", noteSchema);
