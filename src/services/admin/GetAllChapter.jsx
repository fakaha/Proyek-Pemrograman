import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchAllChapter = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(`${_key}?limit=${_params.limit}`);

  return data;
};

export const useAllChapter = (options) => {
  return useQuery([API_ENDPOINT.GET_CHAPTER, options], fetchAllChapter);
};
