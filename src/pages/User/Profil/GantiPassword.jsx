import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LayoutUser } from "../../../Layout/LayoutUser";
import { SidebarProfil } from "../../../components/Sidebar/SidebarProfil";
import { useGantiPassword } from "../../../services/User Profile/ganti_password";
import { Link } from "react-router-dom";

export const GantiPassword = () => {
  const isMobile = window.innerWidth <= 768;

  const [passwordShownOne, setPasswordShownOne] = useState(false);
  const [passwordShownTwo, setPasswordShownTwo] = useState(false);
  const [passwordShownThree, setPasswordShownThree] = useState(false);
  const [gantiPasswordd, setgantiPassword] = useState("");

  const {
    mutate: gantiPassword,
    isError,
    error,
  } = useGantiPassword({
    onError: (error) => {
      setgantiPassword(error);
    },
  });

  const [passwordData, setPasswordData] = useState({
    password_lama: "",
    password_baru: "",
    Confirmationpassword_baru: "",
  });

  const handleInput = (e) => {
    if (e) {
      const { id, value } = e.target;
      setPasswordData({ ...passwordData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    gantiPassword(passwordData);
  };

  const togglePasswordVisibility = () => {
    setPasswordShownOne(!passwordShownOne);
  };
  const togglePasswordVisibilityTwo = () => {
    setPasswordShownTwo(!passwordShownTwo);
  };
  const togglePasswordVisibilityThree = () => {
    setPasswordShownThree(!passwordShownThree);
  };

  return (
    <>
      <LayoutUser>
        <div
          className={`mx-auto ${
            isMobile
              ? "w-full px-3"
              : "w-4/5 bg-primary rounded-xl border border-primary"
          }`}
        >
          {!isMobile && (
            <div className="flex flex-col items-center mt-5 mb-6">
              <div className="text-white text-xl font-bold">Akun</div>
            </div>
          )}
          {isMobile && (
            <Link
              className="block py-2 px-4 cursor-pointer mt-6"
              to={"/profil"}
            >
              <FaArrowLeft className="w-6 h-6 inline-block" />
            </Link>
          )}
          <div
            className={`flex ${isMobile ? "rounded-xl" : "bg-white shadow-md"}`}
          >
            {/* Left Side - Menu */}
            {!isMobile && <SidebarProfil />}

            {/* Right Side - Profile Form */}

            <div className={`p-4 ${isMobile ? "w-full pt-2" : "w-2/3"}`}>
              <div
                className={`flex flex-col mb-6  ${
                  isMobile ? "" : "items-center"
                }`}
              >
              </div>

              <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                <p className="text-black text-2xl font-bold mb-7 desktop:text-center desktopfull:text-center">Ubah Password</p>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block text-black-600 mb-1"
                  >
                    Masukan Password Lama
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShownOne ? "text" : "password"}
                      id="password_lama"
                      name="password_lama"
                      value={passwordData.password_lama}
                      onChange={handleInput}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                      autoComplete="off"
                      required
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordShownOne ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffOutline />
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block text-black-600 mb-1"
                  >
                    Masukan Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShownTwo ? "text" : "password"}
                      id="password_baru"
                      name="password_baru"
                      value={passwordData.password_baru}
                      onChange={handleInput}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                      autoComplete="off"
                      required
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={togglePasswordVisibilityTwo}
                    >
                      {passwordShownTwo ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffOutline />
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block text-black-600 mb-1"
                  >
                    Ulangi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShownThree ? "text" : "password"}
                      id="Confirmationpassword_baru"
                      name="Confirmationpassword_baru"
                      value={passwordData.Confirmationpassword_baru}
                      onChange={handleInput}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                      autoComplete="off"
                      required
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={togglePasswordVisibilityThree}
                    >
                      {passwordShownThree ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffOutline />
                      )}
                    </span>
                  </div>
                </div>
                {isError && (
                  <div className="text-red-500 text-center mb-4">
                    {error.message}
                  </div>
                )}
                <div className="flex justify-center mb-5">
                  <br></br>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white font-bold mt-3 py-2 px-4 focus:outline-none focus:shadow-outline w-full rounded-lg"
                  >
                    Simpan Profil Saya
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutUser>
    </>
  );
};
