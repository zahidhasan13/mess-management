import mongoose from "mongoose";
const monthlySummarySchema = new mongoose.Schema(
  {
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
    },
    month: String,
    totalMeal: Number,
    totalExpenditure: Number,
    mealRate: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MonthlySummary = mongoose.models.MonthlySummary || mongoose.model("MonthlySummary", monthlySummarySchema);
export default MonthlySummary;
