import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  balance: number;
}

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  balance: { type: Number, default: 0 },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    }
  },
});

export default mongoose.model<IUser>("User", UserSchema);
