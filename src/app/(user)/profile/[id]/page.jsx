"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  DollarSign,
  Utensils,
  Home,
  Edit2,
  Check,
  LogOut,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useFetchMess from "@/hooks/useFetchMess";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfilePage = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { mess } = useFetchMess();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch mess data");
        }

        setUser(data.user);
        console.log(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-500";
      case "MessMember":
        return "bg-orange-100 text-orange-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {user?.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullName}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                      user?.role
                    )}`}
                  >
                    {user?.role}
                  </span>
                  {user?.isVerified && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-gradient-to-br from-orange-500 to-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer">
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <Link href="/">
                <button className="bg-gradient-to-br from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer">
                  <span>Dashboard</span>
                </button>
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal & Meal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Role
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Member Since
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Meal Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-red-500" />
                Meal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">
                        Member Meals
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {user?.memberMeal}
                      </p>
                    </div>
                    <Utensils className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">
                        Guest Meals
                      </p>
                      <p className="text-2xl font-bold text-orange-700">
                        {user?.guestMeal}
                      </p>
                    </div>
                    <User className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">
                        Total Meals
                      </p>
                      <p className="text-2xl font-bold text-purple-700">
                        {user?.memberTotalMeal}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial & Mess Info */}
          <div className="space-y-6">
            {/* Financial */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-red-500" />
                Financial Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">
                    Deposit
                  </span>
                  <span className="text-lg font-bold text-green-800">
                    ৳{user?.deposit}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">
                    Meal Bill
                  </span>
                  <span className="text-lg font-bold text-red-800">
                    ৳{user?.expend}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Balance
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        user?.deposit - user?.expend
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ৳{user?.deposit - user?.expend}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mess */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-orange-500" />
                Mess Name
              </h2>
              <div className="text-center py-4">
                {mess?.messName ? (
                  <div>
                    <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {mess?.messName}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500 mb-2">
                      Not assigned to any mess
                    </p>
                    <span className="text-orange-500 text-sm font-medium">
                      Join a Mess
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
