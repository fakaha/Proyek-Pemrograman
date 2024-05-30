import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchPostPayment = async (input) => {
  return await http
    .post(API_ENDPOINT.POST_PAYMENT_CHECKOUT, input)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const usePostPayment = () => {
  return useMutation(fetchPostPayment);
};
