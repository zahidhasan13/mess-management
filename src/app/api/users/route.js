import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const GET = async () => {
  await connectDB();
  try {
    const users = await User.find(); 

    return Response.json(
      { message: "Users fetched successfully", users },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
};



export const POST = async (request) => {
  await connectDB();
  try {
    const userData = await request.json();
    const { fullName, email, password } = userData;

    if (!fullName && !email && !password) {
      throw new Error("All Fields Are Required!");
    }

    if (!fullName) {
      throw new Error("Full name is required!");
    }
    if (!email) {
      throw new Error("Email is required!");
    }
    if (!password) {
      throw new Error("Password is required!");
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Replace the plain password with the hashed one
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User Registered Successfully!", user },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};

