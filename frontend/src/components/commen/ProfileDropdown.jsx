"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUser,
  FiGrid,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import useLogout from "../../hooks/useLogout";

const ProfileDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const {handleLogout} = useLogout()

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
   


  
  return (
    <div ref={dropdownRef} className="relative  w-max">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 flex items-center gap-3 cursor-pointer rounded-lg border border-slate-300 text-sm  text-[#0A3D62] font-semibold hover:bg-slate-100"
      >
        <Image
          src={user?.profilepic && user?.profilepic.length > 0 ? user.profilepic : "/unknownuser.webp" }
          alt="profile"
          width={28}
          height={28}
          className="rounded-full"
        />
        {user?.name || "User"}
        <FiChevronDown className="text-slate-400" />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          <li
            onClick={() => {
              router.push(`${user?.role === "mc" ? "/mcadmin/settings":"/citizen/settings"}`);
              setOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <FiUser className="w-4 h-4" />
            View Profile
          </li>

          <li
            onClick={() => {
              router.push(
                user?.role === "mc"
                  ? "/mcadmin/dashboard"
                  : "/citizen/dashboard"
              );
              setOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <FiGrid className="w-4 h-4" />
            Dashboard
          </li>

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
