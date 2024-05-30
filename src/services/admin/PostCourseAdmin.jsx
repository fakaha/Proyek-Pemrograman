import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchPostCourse = async (input) => {
  const response = await http.post(API_ENDPOINT.POST_ADD_COURSE, input, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const usePostCourse = () => {
  return useMutation(fetchPostCourse);
};
