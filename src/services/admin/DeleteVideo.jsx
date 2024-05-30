import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import { useMutation } from "@tanstack/react-query";

export const fetchDeleteVideo = async (input, video_id) => {
  return await http.delete(API_ENDPOINT.DELETE_VIDEO_ADMIN + video_id);
};

export const useDeleteVideo = (options) => {
  const {video_id} = options
  return useMutation((input) => fetchDeleteVideo(input, video_id));

};
