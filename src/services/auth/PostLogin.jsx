import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import { CookiesKeys, CookieStorage } from "../../utils/cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = async (input) => {
  return await http
    .post(API_ENDPOINT.LOGIN_USER, input)
    .then((result) => {
      CookieStorage.set(CookiesKeys?.AuthToken, result?.data?.data?.token);
      const userRole = result?.data?.data?.user?.role;

      toast.success("Berhasil Login!", {
        position: "top-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        if (userRole === "user") {
          window.location.href = "/home";
        } else if (userRole === "admin") {
          window.location.href = "/admin";
        }
      }, 2000);

      return result?.data;
    })
    .catch((err) => {
      const errorMessage = err?.response?.data?.error;

      if (errorMessage === "lakukan verifikasi terlebih dahulu") {
        toast.error(`${errorMessage}, anda akan diarahkan ke otp`, {
          position: "top-center",
          pauseOnHover: true,
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.href = "/otp";
        }, 4000); // Consider increasing this if needed
      } else {
      }

      throw new Error(errorMessage);
    });
};

const useLoginUser = () => {
  return useMutation(LoginUser);
};

export { LoginUser, useLoginUser };
