import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchSendEmail = async (input) => {
  return await http
    .post(API_ENDPOINT.POST_SEND_EMAIL, input)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const useSendEmail = () => {
  return useMutation(fetchSendEmail);
};
