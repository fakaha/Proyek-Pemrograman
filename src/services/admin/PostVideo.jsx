import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchPostVideo = async (input) => {
  return await http.post(API_ENDPOINT.POST_VIDEO_ADMIN, input).then((result) => {
    return result
  }).catch((err) => {
    throw err
  });;
};

export const usePostVideo = () => {
  return useMutation(fetchPostVideo);
};
