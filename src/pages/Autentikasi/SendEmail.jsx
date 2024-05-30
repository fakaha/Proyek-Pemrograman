import React, { useState } from "react";
import { useSendEmail } from "../../services/auth/PostSendEmail";
import belajar from "../../assets/img/logo-white.png";
import belajardua from "../../assets/img/logo-purple.png";

export const SendEmail = () => {
  const isMobile = window.innerWidth <= 768;

  const [getEmail, setEmail] = useState("");

  const { mutate: postEmail, data } = useSendEmail();

  const handleSendEmail = () => {
    postEmail({
      email: getEmail,
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
            <div className="mb-3 space-y-1">
              <label htmlFor="email" className="block text-black-600">
                Email
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold rounded-md py-2 px-4 w-full mb-4"
              onClick={handleSendEmail}
            >
              Kirim
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
