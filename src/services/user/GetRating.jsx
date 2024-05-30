import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const fetchRating = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  
  return data;
};

//untuk Dinamis handle
const useGetRating = (options, course_id, skor, limit, page) => {
  return useQuery([API_ENDPOINT.GET_RATING, options], () => fetchRating({ queryKey: [API_ENDPOINT.GET_RATING, { ...options, course_id, skor, limit, page }] }));
};

export { fetchRating, useGetRating };
