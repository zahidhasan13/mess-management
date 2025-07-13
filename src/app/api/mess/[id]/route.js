import connectDB from "@/lib/connectDB";
import Mess from "@/models/messModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    let messId = params?.id;
    if (!messId) {
      const urlParts = request.url.split("/");
      messId = urlParts[urlParts.length - 1];
    }

    const { email, currentUserId } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(messId)) {
      return NextResponse.json({ error: "Invalid mess ID" }, { status: 400 });
    }

    const mess = await Mess.findById(messId);
    if (!mess) {
      return NextResponse.json({ error: "Mess not found" }, { status: 404 });
    }

    if (mess.admin.toString() !== currentUserId) {
      return NextResponse.json({ error: "Only admin can add members" }, { status: 403 });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return NextResponse.json({ error: "User not found with that email" }, { status: 404 });
    }
    if (userToAdd?.role === "MessMember" || userToAdd?.role === "admin") {
      throw new Error("User is already a member of another mess.");
    }

    if (mess.members.includes(userToAdd._id)) {
      return NextResponse.json({ error: "User is already a member" }, { status: 409 });
    }

    // Add user to mess
    mess.members.push(userToAdd._id);
    mess.totalMembers = mess.members.length;

    await mess.save();

    await User.updateOne(
      { _id: userToAdd._id },
      { mess: mess._id, role: "MessMember" }
    );

    // Force update and return updated mess
    const updatedMess = await updateMessTotals(messId);

    return NextResponse.json(
      { message: "Member added successfully", mess: updatedMess },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
};


// Helper function to update mess totals
async function updateMessTotals(messId) {
  const members = await User.find({ mess: messId });
  const totalDeposit = members.reduce((sum, member) => sum + (member.deposit || 0), 0);

  const mess = await Mess.findById(messId);
  const totalMeal = mess.totalMeal || 0;
  const totalExpend = mess.totalExpend || 0;
  const mealRate = totalMeal > 0 ? totalExpend / totalMeal : 0;

  // Perform update and return updated document
  const updatedMess = await Mess.findByIdAndUpdate(
    messId,
    {
      totalDeposit,
      mealRate: parseFloat(mealRate.toFixed(2)),
    },
    { new: true } // return the updated document
  );

  return updatedMess;
}










