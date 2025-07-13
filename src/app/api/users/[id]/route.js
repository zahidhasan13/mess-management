import connectDB from "@/lib/connectDB";
import DailyMeal from "@/models/dailyMealModel";
import Mess from "@/models/messModel";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const userId = await params?.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password"); 
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}


export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const {
      deposit = 0,
      guestMeal = 0,
      memberMeal = 0,
      expend = 0,
    } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalMealsAdded = guestMeal + memberMeal;
    const newExpend = user.expend + expend;
    const newDeposit = user.deposit + deposit;

    // Update User
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $inc: {
          deposit,
          guestMeal,
          memberMeal,
          memberTotalMeal: totalMealsAdded,
          expend,
        },
        due: newDeposit - newExpend,
      },
      { new: true, runValidators: true }
    );

    // Update Mess
    if (user?.mess) {
      await Mess.findByIdAndUpdate(user.mess, {
        $inc: {
          totalMeal: totalMealsAdded,
          totalExpend: expend,
        },
      });
    }

    // === SYNC WITH DailyMeal ===
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const existingRecord = await DailyMeal.findOne({
      user: id,
      date: startOfDay,
    });

    if (existingRecord) {
      // Update existing record
      existingRecord.memberMeal += memberMeal;
      existingRecord.guestMeal += guestMeal;
      existingRecord.mealCount += totalMealsAdded;
      await existingRecord.save();
    } else {
      // Create new daily record
      await DailyMeal.create({
        user: id,
        mess: user.mess,
        date: startOfDay,
        memberMeal,
        guestMeal,
        mealCount: totalMealsAdded,
      });
    }

    return NextResponse.json(
      {
        message: "User updated and daily meal synced successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};


// DELETE /api/user/[id]
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
