import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchMyCourse = async (search, limit, categoryIds, levels, rating, order, page) => {
  const categoryParams = categoryIds
    .map((categoryId) => `category_ids=${categoryId}`)
    .join("&");
  const levelParams = levels.map((level) => `level=${level}`).join("&");

  // Add the page parameter to the API endpoint
  const { data } = await http
    .get(
      `${API_ENDPOINT.GET_MY_CLASS}?search=${search}&limit=${limit}&${categoryParams}&${levelParams}&sort=${rating}&order=${order}&page=${page}`
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });

  return data;
};

export const useMyCourse = (search, limit, categoryIds, levels, rating, order, page, options) => {
  return useQuery({
    queryKey: ["course", { search, limit, categoryIds, levels, rating, order, page, ...options }],
    queryFn: () => fetchMyCourse(search, limit, categoryIds, levels, rating, order, page),
  });
};

