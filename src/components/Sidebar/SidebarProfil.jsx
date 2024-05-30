import React from "react";
import { GoPencil, GoGear } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";

export const SidebarProfil = () => {
  const isMobile = window.innerWidth <= 1024;
  // const navigate = useNavigate()

  const handleLogout = () => {
    CookieStorage.remove(CookiesKeys.AuthToken);
    window.location.href = "/home";
  };

  return (
    <div className={`p-4 flex flex-col ${isMobile ? "w-full" : "w-1/3"}`}>
      <div className="text-primary">
        <Link className="flex gap-2.5 items-center cursor-pointer" to={"/profil?edit=true"}>
          <GoPencil className="text-lg" />
          <span className="text-black font-semibold hover:text-primary">
            <div className="block cursor-pointer" >
              Profil Saya
            </div>
          </span>
        </Link>
        <hr className="my-4" />

        <Link className="flex gap-2 items-center cursor-pointer" to={"/profil/gantipassword"}>
          <GoGear className="text-lg" />
          <span className="text-black font-semibold hover:text-primary">
            <div className="block cursor-pointer">
              Ubah Password
            </div>
          </span>
        </Link>
        <hr className="my-4" />

        <Link className="flex gap-2 items-center cursor-pointer" to={"/profil/riwayat"}>
          <BsCart3 className="text-lg" />
          <span className="text-black font-semibold hover:text-primary">
            <div className="block cursor-pointer" >
              Riwayat Pembayaran
            </div>
          </span>
        </Link>
        <hr className="my-4" />

        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={handleLogout}
        >
          <BiLogOut className="text-lg" />
          <span className="text-black font-semibold hover:text-primary">
            Keluar
          </span>
        </div>
        <hr className="my-4" />
      </div>
      <div className="text-center">
        <span className="text-xs">Version 1.1.0</span>
      </div>
    </div>
  );
};
