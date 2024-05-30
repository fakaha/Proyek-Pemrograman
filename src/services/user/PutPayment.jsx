import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchPutPayment = async (input) => {
  return await http
    .put(API_ENDPOINT.POST_PAYMENT_CHECKOUT, input)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const usePutPayment = () => {
  return useMutation(fetchPutPayment);
};
