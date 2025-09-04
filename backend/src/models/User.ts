import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt:string;
  updatedAt:string;
  matchPassword: (password: string) => Promise<boolean>;
}

function getFormattedDate(): string {
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

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: String, default: getFormattedDate },
    updatedAt: { type: String, default: getFormattedDate },
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = getFormattedDate();
  }
  this.updatedAt = getFormattedDate();
  next();
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
