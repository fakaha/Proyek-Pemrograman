import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const fetchPostCourse = async (input) => {
  return await http
    .post(API_ENDPOINT.POST_COURSE, input)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export const usePostCourse = () => {
  return useMutation(fetchPostCourse);
};
