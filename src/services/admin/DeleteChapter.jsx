import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"
import { useMutation } from "@tanstack/react-query";

export const fetchDeleteChapter = async(input, chapter_id) => {
  return await http.delete(API_ENDPOINT.DELETE_CHAPTER + chapter_id);
}

export const useDeleteChapter = (options) => {
  const {chapter_id} = options
  return useMutation((input) => fetchDeleteChapter(input, chapter_id));
}
