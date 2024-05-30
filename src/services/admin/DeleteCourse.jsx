import { useMutation } from "@tanstack/react-query"
import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"

export const fetchDeleteCourse = async(input, course_id) => {
  return await http.put(API_ENDPOINT.DELETE_COURSE + course_id).then((result) => {
    return result
  }).catch((err) => {
    return err
  });
}

export const useDeleteCourse = (options) => {
  const {course_id} = options
  return useMutation((input) => fetchDeleteCourse(input, course_id));
}