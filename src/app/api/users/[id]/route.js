import connectDB from "@/lib/connectDB";
import Mess from "@/models/messModel";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    // Properly destructure params without await
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

    // Fetch existing user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalMealsAdded = guestMeal + memberMeal;
    const newExpend = user.expend + expend;
    const newDeposit = user.deposit + deposit;

    // Update user
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

    // Update totalMeal in related Mess
    if (user?.mess) {
      await Mess.findByIdAndUpdate(
        user.mess,
        {
          $inc: {
            totalMeal: totalMealsAdded,
            totalExpend: expend,
          }
        }
      );
    }

    return NextResponse.json(
      { 
        message: "User updated successfully", 
        user: updatedUser 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User PATCH error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error" 
      },
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
