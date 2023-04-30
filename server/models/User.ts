import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: {
    type: string;
    required: boolean;
    minlength: number;
  };
  email: { type: string; unique: boolean };
  passwordHash: string;
  name: string;
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
