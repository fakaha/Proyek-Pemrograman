import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const fetchNotifikasi = async ({ queryKey }) => {
  const [_key, { limit, page }] = queryKey;
  const url = `${_key}?limit=${limit}&page=${page}`;
  return await http
    .get(url)
    .then((result) => {
      console.log(result.data.data.notificationsWithType, "result data");
      const notif = result.data;
      return notif;
    })
    .catch((err) => {
      console.log(err);
    });
};

// For dynamic handling
const useNotifikasi = (options) => {
  return useQuery([API_ENDPOINT.NOTIFIKASI_USER, options], fetchNotifikasi);
};

export { fetchNotifikasi, useNotifikasi };
