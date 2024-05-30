import { useMutation } from "@tanstack/react-query"
import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"

export const fetchPutChapter = async(input, chapter_id) => {
  return await http.put(API_ENDPOINT.PUT_CHAPTER + chapter_id, input)
}

export const usePutChapter = (options) => {
  const {chapter_id} = options
  return useMutation((input) => fetchPutChapter(input, chapter_id));
}