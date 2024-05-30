import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLoginUser } from "../../services/auth/PostLogin";
import belajar from "../../assets/img/logo-white.png";
import belajardua from "../../assets/img/logo-purple.png";

export const LoginUser = () => {

  const isMobile = window.innerWidth <= 768;

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const {
    mutate: Login,
    isError,
    error,
  } = useLoginUser({
    onError: (error) => {
      setLoginError(error);
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const loginUser = (e) => {
    e.preventDefault();

    Login({
      email: email,
      password: password,
    });
  };

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col h-screen items-center" : "h-screen"
      }`}
    >
      {/* Bagian Kiri */}
      <div
        className={`bg-gray-100 ${
          isMobile
            ? "w-full h-full flex-grow flex flex-col justify-center items-center"
            : "w-1/2 flex justify-center items-center"
        }`}
      >
        <div className={`${isMobile ? "block mb-6" : "hidden"}`}>
          <img src={belajardua} alt="Belajar" className="object-cover w-1/3 mx-auto" />
        </div>
        <div
          className={`p-8 text-sm border rounded-md border-primary bg-white shadow-lg shadow-primary ${
            isMobile ? "w-4/5 mx-auto" : "w-3/4"
          }`}
        >
          <h1 className="text-3xl font-bold mb-0.5 text-primary">Masuk</h1>
          <hr className="my-3" />
          {isError && (
            <div className="text-red-800 text-medium bg-red-300 text-center my-4 border rounded-md border-red-300 shadow py-1.5 px-3">
              {error.message}
            </div>
          )}
          <form onSubmit={loginUser}>
            <div className="mb-3 space-y-1">
              <label htmlFor="email" className="block text-black-600">
                Email
              </label>
              <input
                onChange={handleInput}
                type="text"
                id="email"
                name="email"
                placeholder="john_doe@gmail.com"
                className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            <div className="mb-1 space-y-1">
              <label htmlFor="password" className="block text-black-600">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handleInput}
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password anda"
                  className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
            {/* Tautan untuk reset password, gantikan "#" dengan link yang sesuai */}
            <Link
              className="text-right text-sm hover:underline text-primary cursor-pointer"
              to={"/sendemail"}
            >
              Lupa Kata Sandi?
            </Link>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold rounded-md py-2 px-4 w-full mt-4 mb-2"
            >
              Masuk
            </button>
          </form>

          {/* Tautan untuk registrasi, gantikan "#" dengan link yang sesuai */}
          <p
            className={`mb-5 ${
              isMobile ? "mt-auto text-center absolute inset-x-0 bottom-0" : ""
            }`}
          >
            Belum punya akun?{" "}
            <Link className="hover:underline text-primary" to={"/register"}>
              Daftar disini
            </Link>
          </p>
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

export default LoginUser;
