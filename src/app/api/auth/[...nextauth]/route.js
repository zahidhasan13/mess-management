import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
  if (user) {
    // First time: on login
    token.id = user.id;
    token.fullName = user.fullName;
    token.email = user.email;
    token.role = user.role;
  } else {
    // Every request: fetch from DB to get updated role
    const dbUser = await User.findById(token.id);
    if (dbUser) {
      token.role = dbUser.role;
    }
  }

  return token;
},

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.role = token.role; 
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
