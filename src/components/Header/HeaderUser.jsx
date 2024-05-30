import React, { useEffect, useState } from "react";
import { FiChevronDown, FiLogIn } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { LuBell } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { getDataMe } from "../../redux/actions/meAction";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/img/white-logo-cw.png";

export const HeaderUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [getHandleDropwdown, setHandleDropdown] = useState(false);
  const [getBurger, setBurger] = useState(false);

  const searchValue = localStorage.getItem("searchValues")
    ? localStorage.getItem("searchValues")
    : "";

  const [getSearch, setSearch] = useState(searchValue);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      localStorage.setItem("searchValues", getSearch);
      navigate("/kelas", {
        state: {
          search: getSearch,
        },
      });
    }
  };

  useEffect(() => {
    if (location.pathname !== "/kelas" || location.state === null) {
      setSearch("");
      localStorage.removeItem("searchValues");
    }
  }, [location.pathname, location.state, searchValue]);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    if (token) {
      dispatch(getDataMe());
    }
  }, [token]);

  const { name, email, url } = useSelector((state) => state.user);

  const handleLogout = () => {
    CookieStorage.remove(CookiesKeys.AuthToken);
    window.location.href = "/home";
  };

  return (
    <div className="mobile:relative desktop:static desktopfull:static mobile:p-0 desktop:px-36 desktopfull:px-36 desktop:py-3 desktopfull:py-3 bg-primary">
      <div
        onClick={() => setBurger(false)}
        className={`${
          getBurger ? "mobile:block" : "mobile:hidden"
        } mobile:fixed z-20 desktop:hidden desktopfull:hidden bg-black/30 h-[100dvh] w-[100dvh]`}
      ></div>
      <div className="mobile:flex items-center justify-center relative desktop:hidden desktopfull:hidden py-3">
        <div className="cursor-pointer" onClick={() => navigate("/home")}>
          <img src={logo} alt="" className="w-20 object-cover" />
        </div>
        <RxHamburgerMenu
          onClick={() => setBurger(true)}
          className="absolute z-50 right-4 cursor-pointer text-white hover:text-gray-300"
        />
      </div>
      <div
        className={`mobile:fixed desktop:static desktopfull:static mobile:z-20 mobile:top-0 ${
          getBurger ? "mobile:flex" : "mobile:hidden"
        } desktop:flex desktopfull:flex mobile:flex-col desktop:flex-row desktopfull:flex-row desktop:justify-between desktopfull:justify-between items-center mobile:bg-primary desktop:bg-transparent desktopfull:bg-transparent mobile:py-5 desktop:py-0 desktopfull:py-0 mobile:w-3/4 desktop:w-full desktopfull:w-ful mobile:h-full desktop:h-auto desktopfull:h-auto`}
      >
        <div className="flex mobile:flex-col desktop:flex-row desktopfull:flex-row items-center mobile:gap-5 desktop:gap-16 desktopfull:gap-16 mobile:4/5 desktop:w-1/2 desktopfull:1/2">
          <div className="mobile:flex mobile:items-center mobile:justify-center relative w-full mobile:mb-0 desktop:mb-0 desktopfull:mb-0">
            <div
              className="mobile:flex mobile:justify-center mobile:items-center cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <img src={logo} alt="" className="w-32 object-cover" />
            </div>
            <RxCross2
              className="w-5 h-5 absolute mobile:block desktop:hidden desktopfull:hidden right-0 text-white cursor-pointer"
              onClick={() => setBurger(false)}
            />
          </div>
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Cari kursus..."
              className="border-grey-500 rounded-md text-sm ps-6 pe-16 py-2.5 text-black mobile:w-full desktop:w-[345px] desktopfull:w-[345px]"
              value={getSearch}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 text-primary"
            >
              <BiSearchAlt className="w-5 h-5" />
            </button>
          </div>
        </div>

        {token ? (
          <div className="relative flex items-center mobile:flex-col desktop:flex-row desktopfull:flex-row mobile:mt-5 desktop:mt-0 desktopfull:mt-0 desktop:gap-5 desktopfull:gap-5 mobile:gap-0 mobile:w-full desktop:w-auto desktopfull:w-auto mobile:text-sm desktop:text-base desktopfull:text-base text-white">
            <div className="mobile:flex mobile:flex-col mobile:gap-1.5 w-full desktop:hidden desktopfull:hidden mobile:pb-3 text-center desktop:pb-0 desktopfull:pb-0 mb-4">
              <img
                src={url}
                alt="profilepicture"
                className="w-8 h-8 object-cover rounded-full mx-auto text-center"
              />
              <div className="text-gray-300 font-semibold mt-1">{name}</div>
              <div className="text-gray-300 text-xs">{email}</div>
            </div>
            <Link
              className="desktop:px-0 desktopfull:px-0 desktop:py-2 desktopfull:py-2 cursor-pointer hover:bg-white hover:text-primary mobile:rounded-none desktop:hover:rounded-lg mobile:border-y desktop:border-0 desktopfull:border-0 mobile:border-gray-300 mobile:w-full desktop:w-[100px] desktopfull:w-[100px] desktop:h-full mobile:py-6 mobile:text-center font-semibold"
              to={"/kelas"}
            >
              Kelas
            </Link>
            <Link
              className="desktop:px-0 desktopfull:px-0 desktop:py-2 desktopfull:py-2 cursor-pointer hover:bg-white hover:text-primary mobile:rounded-none desktop:hover:rounded-lg mobile:border-b desktop:border-0 desktopfull:border-0 mobile:border-gray-300 mobile:w-full desktop:w-[100px] desktopfull:w-[100px] desktop:h-full mobile:py-6 mobile:text-center font-semibold"
              to={"/notifikasi"}
            >
              {/* <LuBell className="mobile:hidden desktop:block desktopfull:block w-6 h-6 stroke-1" /> */}
              <div className="desktop:font-semibold desktopfull:font-semibold">
                Notifikasi
              </div>
            </Link>
            <div
              className="mobile:hidden desktop:flex desktopfull:flex items-center justify-center gap-1 py-1 cursor-pointer hover:bg-white hover:text-primary hover:rounded-lg desktop:w-[150px] desktopfull:w-[150px] desktop:h-full"
              onClick={() =>
                getHandleDropwdown
                  ? setHandleDropdown(false)
                  : setHandleDropdown(true)
              }
            >
              <div>
                <img
                  src={url}
                  alt="profilepicture"
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
              <div className="ms-2 desktop:font-semibold desktopfull:font-semibold">
                {name}
              </div>
              <FiChevronDown className="w-5 h-5 stroke-1 mt-1" />
            </div>
            <div
              className={`${
                getHandleDropwdown
                  ? "desktop:flex desktop:flex-col desktopfull:flex desktopfull:flex-col"
                  : "desktop:hidden desktopfull:hidden"
              } mobile:hidden absolute top-10 right-0 z-10 text-sm rounded-lg bg-primary border border-gray-50`}
            >
              <div className="px-4 py-3 text-xs text-slate-50 border-b border-slate-300">
                {email}
              </div>
              <Link
                className="ps-4 pe-16 py-3 hover:bg-gray-100 hover:text-primary cursor-pointer"
                to={"/profil"}
              >
                Profil
              </Link>
              <Link
                className="ps-4 pe-16 py-3 hover:bg-gray-100 hover:text-primary cursor-pointer"
                to={"/kelassaya"}
              >
                Kelas Saya
              </Link>
              <Link
                className="ps-4 pe-16 py-3 hover:bg-gray-100 hover:text-primary cursor-pointer"
                onClick={handleLogout}
              >
                Keluar
              </Link>
            </div>
            <div
              className={`mobile:flex mobile:flex-col desktop:hidden desktopfull:hidden mobile:static desktop:absolute desktopfull:absolute top-10 right-0 z-10 text-sm bg-primary desktop:border desktopfull:border desktop:border-grey-100 desktopfull:border-grey-100 mobile:w-full desktop:w-auto desktopfull:w-auto mobile:mt-5 desktop:mt-0 desktopfull:mt-0`}
            >
              <Link
                className="mobile:ps-0 desktop:ps-4 desktopfull:ps-4 mobile:pe-0 desktop:pe-16 desktopfull:pe-16 py-6 mobile:hover:bg-white mobile:hover:text-primary cursor-pointer mobile:w-full desktop:w-auto desktopfull:w-auto mobile:text-center mobile:border-y mobile:border-gray-300 font-semibold"
                to={"/profil"}
              >
                Profil
              </Link>
              <Link
                className="mobile:ps-0 desktop:ps-4 desktopfull:ps-4 mobile:pe-0 desktop:pe-16 desktopfull:pe-16 py-6 mobile:hover:bg-white mobile:hover:text-primary cursor-pointer mobile:w-full desktop:w-auto desktopfull:w-auto mobile:text-center mobile:border-b mobile:border-gray-300 font-semibold"
                to={"/kelassaya"}
              >
                Kelas Saya
              </Link>
              <Link
                className="mobile:ps-0 desktop:ps-4 desktopfull:ps-4 mobile:pe-0 desktop:pe-16 desktopfull:pe-16 py-6 mobile:hover:bg-white mobile:hover:text-primary cursor-pointer mobile:w-full desktop:w-auto desktopfull:w-auto mobile:text-center mobile:border-b mobile:border-gray-300 font-semibold"
                onClick={handleLogout}
              >
                Keluar
              </Link>
            </div>
          </div>
        ) : (
          <div className="mobile:mt-6 desktop:mt-0 desktopfull:mt-0 mobile:w-full desktop:w-auto desktopfull:w-auto desktop:flex desktop:gap-3 desktopfull:flex mobile:flex-col desktop:flex-row desktopfull:flex-row desktopfull:gap-3 text-white">
            <Link
              className="mobile:block mobile:text-center mobile:mt-3 desktop:mt-0 desktopfull:mt-0 px-4 py-1 cursor-pointer hover:bg-white hover:text-primary hover:rounded-lg mobile:w-full desktop:w-auto desktopfull:w-auto mobile:py-6"
              to={"/kelas"}
            >
              Kelas
            </Link>
            <hr className="desktop:hidden desktopfull:hidden mobile:w-4/5 mobile:text-center mobile:mx-auto" />
            <Link
              className="flex items-center mobile:justify-center desktop:justify-normal desktopfull:justify-normal gap-2 px-4 mobile:py-6 desktop:py-1 desktopfull:py-1 cursor-pointer hover:bg-white hover:text-primary hover:rounded"
              to={"/login"}
            >
              <FiLogIn className="stroke-1" />
              <span>Masuk</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
