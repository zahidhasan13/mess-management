import connectDB from "@/lib/connectDB";
import Mess from "@/models/messModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export const GET = async (request) => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    
    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Find a mess where the user is a member
    const mess = await Mess.findOne({ members: userId })
      .populate("members")
      .populate("admin");

    if (!mess) {
      return Response.json(
        { error: "No mess found where you are a member" },
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




export const POST = async (request) => {
  await connectDB();
  try {
    const { messName, userId } = await request.json();

    if (!messName || !userId) {
      throw new Error("Mess name and user ID are required!");
    }

    const messData = {
      messName,
      admin: userId,
      members: [userId],
      isMessCreated: true,     
      totalMembers: 1,
    };

    const mess = await Mess.create(messData);

    await User.findByIdAndUpdate(userId,{
      mess:mess._id,
      role:"admin"
    })

    return Response.json(
      { message: "Mess created successfully", mess },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
