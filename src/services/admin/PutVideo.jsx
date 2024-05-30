import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchPutVideo = async (input, video_id) => {
  return await http.put(API_ENDPOINT.PUT_VIDEO_ADMIN + video_id, input);
};

export const usePutVideo = (options) => {
  const { video_id } = options;
  return useMutation((input) => fetchPutVideo(input, video_id));
};
