import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";
import http from "../../utils/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerUser = async (input) => {
  return await http
    .post(API_ENDPOINT.USER_REGISTER, input)
    .then((result) => {
      console.log(result.data.data.token);
      CookieStorage.set(CookiesKeys.AuthToken, result.data.data.token);
      toast.success("Registrasi Berhasil! Anda akan diarahkan ke otp", {
        position: "top-center",
        pauseOnHover: true,
        autoClose: 1500,
      });

      // Delay navigation for 3 seconds
      setTimeout(() => {
        window.location.href = "/otp";
      }, 3000);

      return result.data;
    })
    .catch((err) => {
      console.log(err.response.data.error, "err register user");
      // toast.error(err.response.data.error);
      throw new Error(err.response.data.error);
    });
};

const useRegisterUser = () => {
  return useMutation(registerUser);
};

export { registerUser, useRegisterUser };
