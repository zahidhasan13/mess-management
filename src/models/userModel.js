import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      default: null,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    memberMeal: {
      type: Number,
      default: 0,
    },
    guestMeal: {
      type: Number,
      default: 0,
    },
    memberTotalMeal: {
      type: Number,
      default: 0,
    },
    expend: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user","admin", "MessMember"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
