import mongoose from "mongoose";
const mealRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
    },
    date: {
      type: Date,
    },
    memberMeal:{
      type: Number,
      default: 0,
    },
    guestMeal:{
      type: Number,
      default: 0,
    },
    mealCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DailyMeal =
  mongoose.models.DailyMealSummary ||
  mongoose.model("DailyMealSummary", mealRecordSchema);
export default DailyMeal;
