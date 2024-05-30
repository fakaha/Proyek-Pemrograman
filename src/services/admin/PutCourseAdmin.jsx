import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchPutCourse = async (input, course_id) => {
  console.log(input);
  return await http
    .put(API_ENDPOINT.PUT_COURSE + course_id, input, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const usePutCourse = (options) => {
  const { course_id } = options;
  return useMutation((input) => fetchPutCourse(input, course_id));
};
