import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const fetchUserData = async ({ queryKey }) => {
  const [_key] = queryKey;
  return await http
    .get(_key)
    .then((result) => {
      const resultMe = result.data.data.user;
      console.log(resultMe);
      return resultMe;
    })
    .catch((err) => {
      console.log(err);
    });
};

//untuk Dinamis handle
const useGetDataUser = (options) => {
  return useQuery([API_ENDPOINT.GET_USER, options], fetchUserData);
};

export { fetchUserData, useGetDataUser };
