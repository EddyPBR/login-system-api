import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
}).pre<User>("save", function (next) {
  const user = this;

  user.password = bcrypt.hashSync(this.password, 8);

  next();
});

export default model<User>("User", UserSchema);
