import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchMentor = async ({ queryKey }) => {
  const [ _key, _params ] = queryKey;

  const { data } = await http.get(_key, { params: _params });
  return data;
};

export const useMentor = (options) => {
  return useQuery([API_ENDPOINT.GET_MENTOR, options], fetchMentor);
};
