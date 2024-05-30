import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const fetchUserProgress = async ({ queryKey }) => {
  const [_key] = queryKey;
  return await http
    .get(_key)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

//untuk Dinamis handle
const useGetProgress = (options) => {
  return useQuery([API_ENDPOINT.PROGRESS_COURSE, options], fetchUserProgress);
};

export { fetchUserProgress, useGetProgress };
