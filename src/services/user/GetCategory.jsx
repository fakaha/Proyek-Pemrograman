import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchCategory = async (limit) => {
  const { data } = await http
    .get(`${API_ENDPOINT.GET_CATEGORY}?limit=${limit}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

export const useCategory = (limit, options) => {
  return useQuery({
    queryKey: ["category", { limit, ...options }],
    queryFn: () => fetchCategory(limit),
  });
};

export const fetchCategoryId = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key + _params.kategori_id);

  return data;
};

export const useCategoryId = (options) => {
  return useQuery([API_ENDPOINT.GET_CATEGORY_ID, options], fetchCategoryId);
};
