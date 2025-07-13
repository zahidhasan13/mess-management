"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const ProfileAvatar = ({ userName }) => {
  const [showDropdown, setShowDropDown] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowDropDown(true)}
      onMouseLeave={() => setShowDropDown(false)}
    >
      <Avatar className="cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {showDropdown && (
        <div className="absolute right-0 w-52 bg-white rounded-xl shadow-xl border z-50 p-4 space-y-3">
          <div className="text-left space-y-1">
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-base font-semibold text-gray-800">
              {userName?.fullName}
            </p>
            <Link
              href={`/profile/${userName?.id}`}
              className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              View Profile →
            </Link>
          </div>

          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
