"use client";
import ProfileAvatar from "../ProfileAvatar";
import MessStat from "../MessStat";
import MembersList from "../MembersList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import moment from "moment";
import useFetchMess from "@/hooks/useFetchMess";

const Dashboard = () => {
  const { data: session } = useSession();
  const { mess, loading, error } = useFetchMess();
  const userRole = session?.user?.role;
  console.log(userRole);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6 h-16">
        <div className="flex flex-1 space-x-4 flex-col md:flex-row">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {mess?.messName} Dashboard
          </h1>
        </div>
        {(userRole === "admin" || userRole === "MessMember") && (
          <div className="flex-1 text-center flex flex-col bg-blue-100 rounded py-2 text-blue-800">
            <strong>{moment().format("MMMM")} Month Report</strong>
            <strong>Today: {moment().format("MMM Do YYYY")}</strong>
          </div>
        )}

        <div className="flex-1 text-right">
          <ProfileAvatar userName={session?.user} />
        </div>
      </div>

      <MessStat userName={session?.user} mess={mess} />
      <MembersList userName={session?.user} mess={mess} />
    </div>
  );
};

export default Dashboard;
