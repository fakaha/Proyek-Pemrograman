import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const PutNotifikasi = async (input) => {
  return await http
    .put(API_ENDPOINT.PUT_NOTIFIKASI_USER + input.notifikasi_id)
    .then((result) => {
      console.log(result.data.message);
      return result;
    })
    .catch((err) => {
      console.log(err, "err ganti password");
      throw new Error(err.response.data.error);
    });
};

const usePutNotifikasi = () => {
  return useMutation(PutNotifikasi, {});
};

export { PutNotifikasi, usePutNotifikasi };
