import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useResetPassword } from "../../services/auth/PutResetPassword.";
import { useLocation } from "react-router-dom";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";
import belajar from "../../assets/img/logo-white.png";
import belajardua from "../../assets/img/logo-purple.png";

export const ResetPassword = () => {
  const isMobile = window.innerWidth <= 768;
  const location = useLocation();

  const [passwordShownOne, setPasswordShownOne] = useState(false);
  const [passwordShownTwo, setPasswordShownTwo] = useState(false);
  const [getPassword, setPassword] = useState("");
  const [getConfPassword, setConfPassword] = useState("");

  const togglePasswordVisibilityOne = () => {
    setPasswordShownOne(!passwordShownOne);
  };

  const togglePasswordVisibilityTwo = () => {
    setPasswordShownTwo(!passwordShownTwo);
  };

  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  CookieStorage.set(CookiesKeys.JwtToken, token);

  const { mutate: putPassword } = useResetPassword();
  const handlePassword = () => {
    putPassword({
      password: getPassword,
      confirmationPassword: getConfPassword,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Bagian Kiri */}
      <div
        className={`bg-gray-100 ${
          isMobile
            ? "w-full h-full flex-grow flex flex-col justify-center items-center"
            : "w-1/2 flex justify-center items-center"
        }`}
      >
        <div className={`${isMobile ? "block mb-6" : "hidden"}`}>
          <img
            src={belajardua}
            alt="Belajar"
            className="object-cover w-1/3 mx-auto"
          />
        </div>
        <div
          className={`p-8 text-sm border rounded-md border-primary bg-white shadow-lg shadow-primary ${
            isMobile ? "w-4/5 mx-auto" : "w-3/4"
          }`}
        >
          <h1 className="text-3xl font-bold mb-0.5 text-primary">
            Reset Password
          </h1>
          <hr className="my-3" />
          <div>
            <div>
              <div className="mb-3 space-y-1">
                <label htmlFor="password" className="block text-black-600">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={passwordShownOne ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full border text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={togglePasswordVisibilityOne}
                  >
                    {passwordShownOne ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>

              <div className="mb-3 space-y-1">
                <label
                  htmlFor="confirmationpassword"
                  className="block text-black-600"
                >
                  Ulangi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={passwordShownTwo ? "text" : "password"}
                    id="confirmationpassword"
                    name="confirmationpassword"
                    className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 rounded-2xl"
                    autoComplete="off"
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={togglePasswordVisibilityTwo}
                  >
                    {passwordShownTwo ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold rounded-2xl py-2 px-4 w-full mb-4"
              onClick={handlePassword}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* Bagian Kanan */}
      {!isMobile && (
        <div className="w-1/2 h-full bg-gradient-to-b from-slate-900 via-primary to-slate-900 md:flex flex flex-col items-center justify-center">
          {/* Pastikan path ke gambar sudah benar */}
          <img src={belajar} alt="Belajar" className="object-cover w-1/3" />
        </div>
      )}
    </div>
  );
};
