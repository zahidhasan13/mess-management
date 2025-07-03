import mongoose from "mongoose";
const messSchema = new mongoose.Schema(
  {
    messName: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalMembers: {
      type: Number,
      default: 0,
    },
    totalMeal: {
      type: Number,
      default: 0,
    },
    totalExpend: {
      type: Number,
      default: 0,
    },
    mealRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Mess = mongoose.models.Mess || mongoose.model("Mess", messSchema);
export default Mess;
