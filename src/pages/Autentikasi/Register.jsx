import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import belajar from "../../assets/img/logo-white.png";
import belajardua from "../../assets/img/logo-purple.png";
import { useRegisterUser } from "../../services/auth/register_user";
import { Link } from "react-router-dom";

export const Register = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [no_telp, setno_telp] = useState("");
  const [ConfirmationPassword, setConfirmationPassword] = useState("");
  const [passwordShownOne, setPasswordShownOne] = useState(false);
  const [passwordShownTwo, setPasswordShownTwo] = useState(false);
  const [RegisterError, setRegisterError] = useState(null);

  const {
    mutate: register,
    isError,
    error,
  } = useRegisterUser({
    onError: (error) => {
      setRegisterError(error);
    },
  });

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "nama") {
        setUsername(e.target.value);
      }
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
      if (e.target.id === "no_telp") {
        setno_telp(e.target.value);
      }
      if (e.target.id === "ConfirmationPassword") {
        setConfirmationPassword(e.target.value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({
      email: Email,
      nama: Username,
      password: Password,
      no_telp: no_telp,
      ConfirmationPassword: ConfirmationPassword,
    });
    // Store email for later use (e.g., local storage)
    localStorage.setItem("registeredEmail", Email);
  };

  const togglePasswordVisibilityOne = () => {
    setPasswordShownOne(!passwordShownOne);
  };

  const togglePasswordVisibilityTwo = () => {
    setPasswordShownTwo(!passwordShownTwo);
  };

  const isMobile = window.innerWidth <= 768;

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
          <img
            src={belajardua}
            alt="Belajar"
            className="object-cover w-1/3 mx-auto"
          />
        </div>
        <div
          className={`px-8 py-5 text-sm border rounded-md border-primary bg-white shadow-lg shadow-primary ${
            isMobile ? "w-4/5 mx-auto" : "w-3/4"
          }`}
        >
          <h1 className="text-3xl font-bold mb-0.5 text-primary">Daftar</h1>
          <hr className="my-3" />
          {isError && (
            <div className="text-red-800 text-medium bg-red-300 text-center my-4 border rounded-md border-red-300 shadow py-1.5 px-3">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 space-y-1">
              <label htmlFor="nama" className="block text-black-600">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInput}
                placeholder="John Doe"
              />
            </div>
            <div className="mb-3 space-y-1">
              <label htmlFor="password" className="block text-black-600">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  onChange={handleInput}
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>

            <div className="mb-3 space-y-1">
              <label htmlFor="notelp" className="block text-black-600">
                Nomor Telepon
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="no_telp"
                  name="notelp"
                  className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  onChange={handleInput}
                  placeholder="087812345678"
                />
              </div>
            </div>

            <div className="mb-3 space-y-1">
              <label htmlFor="password" className="block text-black-600">
                Buat Password
              </label>
              <div className="relative">
                <input
                  type={passwordShownOne ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  onChange={handleInput}
                  placeholder="Password anda"
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
              <label htmlFor="password" className="block text-black-600">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={passwordShownTwo ? "text" : "password"}
                  id="ConfirmationPassword"
                  name="password"
                  className="w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  onChange={handleInput}
                  placeholder="Konfirmasi password anda"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibilityTwo}
                >
                  {passwordShownTwo ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold rounded-md py-2 px-4 w-full mb-4"
            >
              Daftar
            </button>
          </form>

          <div>
            <p
              className={`mb-5 ${
                isMobile
                  ? "mt-auto text-center absolute inset-x-0 bottom-0"
                  : ""
              }`}
            >
              Sudah punya akun?{" "}
              <Link to={"/login"} className="hover:underline text-indigo-600">
                Masuk disini
              </Link>
            </p>
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