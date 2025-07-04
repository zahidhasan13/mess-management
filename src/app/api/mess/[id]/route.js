import connectDB from "@/lib/connectDB";
import Mess from "@/models/messModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/userModel";


export const GET = async (request, { params }) => {
  await connectDB();
  try {
    const { id } = params;

    const mess = await Mess.findById(id).populate("members");

    if (!mess) {
      return Response.json(
        { error: "Mess not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Mess fetched successfully", mess },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};


export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    // Get mess ID
    let messId = params?.id;
    if (!messId) {
      const urlParts = request.url.split("/");
      messId = urlParts[urlParts.length - 1];
    }

    const { email, currentUserId } = await request.json();

    // Validate mess ID
    if (!mongoose.Types.ObjectId.isValid(messId)) {
      return NextResponse.json({ error: "Invalid mess ID" }, { status: 400 });
    }

    // Find the mess
    const mess = await Mess.findById(messId);
    if (!mess) {
      return NextResponse.json({ error: "Mess not found" }, { status: 404 });
    }

    // Only admin can add members
    if (mess.admin.toString() !== currentUserId) {
      return NextResponse.json({ error: "Only admin can add members" }, { status: 403 });
    }

    // Find user by email
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return NextResponse.json({ error: "User not found with that email" }, { status: 404 });
    }

    // Check if already a member
    if (mess.members.includes(userToAdd._id)) {
      return NextResponse.json({ error: "User is already a member" }, { status: 409 });
    }

    // Add user to mess
    mess.members.push(userToAdd._id);
    mess.totalMembers = mess.members.length;

    // Update user's mess field
    await User.updateOne({ _id: userToAdd._id }, { mess: mess._id,role:"MessMember" });

    await mess.save();

    return NextResponse.json(
      { message: "Member added successfully", mess },
      { status: 200 }
    );

  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
};



