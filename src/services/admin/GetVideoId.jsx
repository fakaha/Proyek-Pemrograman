import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchGetVideoId = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(`${_key}${_params.video_id}`);

  return data;
};

export const useGetVideoId = (options) => {
  return useQuery([API_ENDPOINT.GET_VIDEO_ADMIN_ID, options], fetchGetVideoId);
};
