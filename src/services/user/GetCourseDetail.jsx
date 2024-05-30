import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchCourseDetail = async ({ queryKey }) => {
  const [_key, options] = queryKey;
  const { course_id, account_id } = options;

  const url = `${_key}${course_id}?account_id=${account_id}`;
  const { data } = await http.get(url);

  return data;
};

export const useCourseDetail = (options) => {
  return useQuery([API_ENDPOINT.GET_COURSE_ID, options], fetchCourseDetail);
};
