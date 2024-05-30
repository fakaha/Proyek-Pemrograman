import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchPostRating = async (input) => {
  return await http
    .post(API_ENDPOINT.POST_RATING_USER, input)
    .then((result) => {
      console.log(result, "result dari berhasil post rating");
      toast.success(result.data.message, {
        position: "top-center",
        pauseOnHover: true,
        autoClose: 3000,
      }); // Corrected typo here
      return result;
    })
    .catch((err) => {
      console.log(err, "err rating post");
      toast.error(err.response.data.err, {
        position: "top-center",
        pauseOnHover: true,
        autoClose: 3000,
      });
      throw err;
    });
};

export const usePostRating = () => {
  return useMutation(fetchPostRating);
};
