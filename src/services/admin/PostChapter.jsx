import { useMutation } from "@tanstack/react-query"
import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"

export const fetchPostChapter = async(input) => {
  return await http.post(API_ENDPOINT.POST_CHAPTER, input)
}

export const usePostChapter = () => {
  return useMutation(fetchPostChapter)
}