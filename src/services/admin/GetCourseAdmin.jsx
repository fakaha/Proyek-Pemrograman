import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchCourseAdmin = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(
    `${_key}?limit=${_params.limit}&page=${_params.page}&search=${_params.search}&sort=${_params.sort}&order=${_params.order}&category_ids=${_params.category}&level=${_params.level}`
  );
  return data;
};

export const useCourseAdmin = (options) => {
  return useQuery([API_ENDPOINT.GET_COURSE, options], fetchCourseAdmin);
};
