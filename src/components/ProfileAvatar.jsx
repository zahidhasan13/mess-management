'use client';

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm font-medium text-gray-800">{userName}</p>
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
