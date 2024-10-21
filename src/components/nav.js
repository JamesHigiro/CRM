import React, { useState } from "react";
import Link from "next/link";
import { FaChartLine, FaHome, FaUser, FaBars } from "react-icons/fa";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#008000] relative flex flex-col md:w-1/4 md:flex-none">
      <div
        className="text-white text-2xl p-4 cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        <FaBars />
      </div>

      <ul
        className={`flex flex-col items-center gap-6 mt-8 ${
          menuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Link href="/overview">
          <li
            className={`flex items-center gap-2 font-bold cursor-pointer w-full text-center ${
              isActive("/overview") ? "text-black" : "text-white"
            }`}
          >
            <FaHome /> Overview
          </li>
        </Link>
        <Link href="/trend">
          <li
            className={`flex items-center gap-2 font-bold cursor-pointer w-full text-center ${
              isActive("/trend") ? "text-black" : "text-white"
            }`}
          >
            <FaChartLine /> Analysis
          </li>
        </Link>
        <Link href="/datalist">
          <li
            className={`flex items-center gap-2 font-bold cursor-pointer w-full text-center ${
              isActive("/datalist") ? "text-black" : "text-white"
            }`}
          >
            <FaUser /> Data List
          </li>
        </Link>
      </ul>
    </nav>
  );
}
