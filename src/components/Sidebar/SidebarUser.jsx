import React from "react";
import { FiLogIn } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { LuBell } from "react-icons/lu";
import { BsList } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Sidebar = ({ isOpen, onToggle, isUserAuthenticated }) => {
  return (
    <div 
      className={`bg-gray-800 text-white h-screen w-64 p-2 fixed top-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300`}
      style={{ zIndex: 1000 }}
    >
      <button onClick={onToggle} className="text-white focus:outline-none lg:hidden ps-4">
          <BsList className={`text-2xl ${isOpen ? 'text-white' : 'text-black'}`} />
      </button>
      {isUserAuthenticated ? (
        <div className="px-4 py-2">
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/home"}
          >
            <IoHomeOutline className="w-6 h-6 inline-block" /> Beranda
          </Link>
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/notifikasi"}
          >
            <LuBell className="w-6 h-6 inline-block" /> Notifikasi
          </Link>
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/kelas"}
          >
            <FaRegPlayCircle className="w-6 h-6 inline-block" /> Kelas
          </Link>
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/kursus"}
          >
            <CiCircleList className="w-6 h-6 inline-block" /> Kursus
          </Link>
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/profil"}
          >
            <FiUser className="w-6 h-6 inline-block" /> Akun
          </Link>
        </div>
      ) : (
        <div className="px-4 py-2">
          <Link
            className="block py-2 cursor-pointer hover:bg-[#489CFF] hover:text-white"
            to={"/login"}
          >
            <FiLogIn className="w-6 h-6 inline-block" /> Masuk
          </Link>
        </div>
      )}
    </div>
  );
};

