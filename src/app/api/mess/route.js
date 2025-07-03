import connectDB from "@/lib/connectDB";
import Mess from "@/models/messModel";
import User from "@/models/userModel";

export const GET = async () => {
  await connectDB();
  try {
    const mess = await Mess.find()
      .populate({
        path: 'members',
        model: 'User',
        selecet:"fullName, deposit, memberMeal, guestMeal,memberTotalMeal, due,expend"
      })
      .populate({
        path: 'admin',
        model: 'User',
      });

    return Response.json(
      { 
        message: "Mess fetched successfully", 
        data: mess 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching mess:', error);
    return Response.json(
      { 
        error: error.message || "Failed to fetch Mess",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
};




export const POST = async (request) => {
  await connectDB();
  try {
    const { messName, userId } = await request.json();
    console.log(messName, userId);

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
