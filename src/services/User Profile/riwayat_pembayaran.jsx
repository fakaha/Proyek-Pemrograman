import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

//untuk hit API
const RiwayatPembayaran = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  console.log(data);
  return data;
};

//untuk Dinamis handle
const useRiwayatPembayaran = (options) => {
  return useQuery([API_ENDPOINT.RIWAYAT_PEMBAYARAN_USER, options], RiwayatPembayaran);
};

export { RiwayatPembayaran, useRiwayatPembayaran };
