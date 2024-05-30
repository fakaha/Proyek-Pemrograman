import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import belajar from "../../assets/img/logo-white.png";
import belajardua from "../../assets/img/logo-purple.png";
import { Link, useNavigate } from "react-router-dom";
import { useSendOTP } from "../../services/auth/otp_user";
import { useReSendOTP } from "../../services/auth/resendOtp_user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const OTP = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [registeredEmail, setRegisteredEmail] = useState(""); // State to hold registered email
  const [OtpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    mutate: sendOTP,
    isError,
    error,
  } = useSendOTP({
    onError: (error) => {
      setOtpError(error);
    },
  });
  const { mutate: resendOTP } = useReSendOTP();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registeredEmail");
    if (storedEmail) {
      setRegisteredEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    // Jangan jalankan timer jika button tidak dalam keadaan disabled
    if (!isButtonDisabled) return;

    // Jika waktu habis, izinkan user untuk mengklik button lagi
    if (timeLeft === 0) {
      setIsButtonDisabled(false);
      return;
    }

    // Kurangi waktu setiap detik
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Bersihkan timer
    return () => clearTimeout(timerId);
  }, [timeLeft, isButtonDisabled]);

  const resendOTPOnClick = () => {
    if (isButtonDisabled) {
      // Logika untuk menangani kondisi saat tombol seharusnya tidak diklik
      return;
    }

    const resendOTPTask = resendOTP(registeredEmail);
    if (resendOTPTask) {
      resendOTPTask
        .then(() => {
          console.log("OTP berhasil dikirim ulang");
          // Mulai hitung mundur setelah OTP berhasil dikirim
          setTimeLeft(60);
          setIsButtonDisabled(true);
        })
        .catch(() => {
          console.error("Gagal mengirimkan ulang OTP");
        });
    } else {
      console.error("resendOTP is undefined");
    }
  };

  const handleChange = (index, event) => {
    const otp = [...otpValues];
    otp[index] = event.target.value;
    console.log(event.target.value);
    setOtpValues(otp);

    if (event.target.value !== "" && index < otpValues.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && otpValues[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSave = () => {
    const fullOtp = otpValues.join("");
    if (fullOtp.length === 6) {
      // Kirim OTP ke API menggunakan useSendOTP
      sendOTP(fullOtp, {
        onSuccess: () => {
          // Display success toast with auto-close after 2 seconds (2000 milliseconds)
          toast.success("Akun anda berhasil dibuat, anda akan diarahkan ke beranda", {
            position: "top-center",
            autoClose: 2000,
          });

          // Delay navigation for 3 seconds to allow the toast to be read
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        },
        onError: () => {
          console.error("Invalid Activation Code or Code Expired");
          // Optionally, you can add a toast for errors too
          toast.error("Kode Aktivasi Tidak Valid atau Kode Telah Kedaluwarsa", {
            position: "top-center",
            autoClose: 2000,
          });
        },
      });
    } else {
      console.error("Harap lengkapi semua digit OTP terlebih dahulu");
      // Optionally, add a toast for this error as well
      toast.error("Kode OTP salah", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div
        className={`bg-gray-100 w-full md:w-1/2 flex ${
          isMobile ? "mt-5" : "items-center justify-center"
        }`}
      >
        <div className="text-sm border rounded-md border-primary bg-white shadow-lg shadow-primary p-8 flex flex-col items-center w-full max-w-md">
          <div className="flex items-center justify-between w-full mb-8">
            <Link to="/register" className="text-black hover:text-indigo-600">
              <IoArrowBackOutline className="h-6 w-6" />
            </Link>
          </div>

          <h2 className="text-3xl mb-2 text-indigo-600 text-center font-bold">
            Masukkan OTP
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Ketik 6 digit kode yang dikirimkan ke {registeredEmail}
          </p>

          {isError && (
            <div className="text-red-800 text-medium bg-red-300 text-center mt-4 mb-5 border rounded-md border-red-300 shadow py-1.5 px-3">
              {error.message}
            </div>
          )}

          <div className="flex justify-center gap-2 mb-8">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                className="form-input rounded-2xl text-center text-xl w-10 h-10 px-2 py-2 border-2 border-indigo-600"
                maxLength="1"
                value={value}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>

          <button
            className={`text-primary hover:text-secondary text-sm mb-4 ${
              isButtonDisabled ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={resendOTPOnClick}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled
              ? `Kirim Ulang OTP dalam ${timeLeft} detik`
              : "Kirim Ulang OTP"}
          </button>

          <button
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave} // Added onClick handler for Save button
          >
            Simpan
          </button>
        </div>
      </div>
      {!isMobile && (
        <div className="w-1/2 h-full bg-gradient-to-b from-slate-900 via-primary to-slate-900 md:flex flex flex-col items-center justify-center">
          {/* Pastikan path ke gambar sudah benar */}
          <img src={belajar} alt="Belajar" className="object-cover w-1/3" />
        </div>
      )}
    </div>
  );
};