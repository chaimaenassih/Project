import mongoose, { Schema } from "mongoose";

export type UserDoc = {
  email: string;
  passwordHash: string;
  role: "member" | "admin";
} & mongoose.Document;

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["member", "admin"], default: "member", required: true }
  },
  { timestamps: true }
);

// Clean JSON output
userSchema.set("toJSON", {
  transform(_doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

export const User = mongoose.model<UserDoc>("User", userSchema);
