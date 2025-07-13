import connectDB from "@/lib/connectDB";
import DailyMeal from "@/models/dailyMealModel";

export const GET = async () => {
  await connectDB();
  try {
    const dailyMeal = await DailyMeal.find(); 

    return Response.json(
      { message: "Users fetched successfully", dailyMeal },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
};