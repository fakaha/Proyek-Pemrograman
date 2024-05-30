import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchGetVideo = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(`${_key}?limit=${_params.limit}`);

  return data;
};

export const useGetVideo = (options) => {
  return useQuery([API_ENDPOINT.GET_VIDEO_ADMIN, options], fetchGetVideo);
};
