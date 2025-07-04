"use client";
import { Button } from "../ui/button";
import { Utensils } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import MessStat from "../MessStat";
import ProfileAvatar from "../ProfileAvatar";
import MembersList from "../MembersList";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [mess, setMess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMess = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/mess");

        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const messData = await res.json();

        setMess(messData?.data);
      } catch (err) {
        console.error("Error fetching mess data:", err);
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMess();
  }, []);

  const messData = mess[0];
  const role = session?.user?.role;
  // Create New Mess
  const createMesshandler = async () => {
    if (!status === "authenticated") {
      toast.error("Login First Please!");
    } else {
      router.push("/create-mess");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex md:items-center space-x-4 flex-col md:flex-row">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {messData?.messName} Dashboard
          </h1>
        </div>
        <div>
          {status === "authenticated" && (
            <ProfileAvatar userName={session?.user?.fullName} />
          )}
        </div>
      </div>
      {mess && role==="admin" ? (
        <MessStat messData={messData} />
      ) : (
        <div className="my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Utensils className="text-orange-500" />
            Establish Your Mess
          </h2>
          <p className="text-gray-600 mb-6">
            Set up your mess management system to streamline meal planning,
            member management, and financial tracking for your organization.
          </p>
          <button
            onClick={() => createMesshandler()}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            Create New Mess
          </button>
        </div>
      )}
      {/* All Members Info */}
      <MembersList mess={mess} />
      <Toaster />
    </div>
  );
};

export default Dashboard;
