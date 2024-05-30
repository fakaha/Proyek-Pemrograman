import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

const GantiPassword = async (input) => {
  return await http
    .put(API_ENDPOINT.GANTI_PASSWORD_USER, input)
    .then((result) => {
      console.log(result.data.message);
      alert(result.data.message);
      return result;
    })
    .catch((err) => {
      console.log(err, "err ganti password");
      throw new Error(err.response.data.error);
    });
};

const useGantiPassword = () => {
  return useMutation(GantiPassword, {});
};

export { GantiPassword, useGantiPassword };
