import { useQuery } from "@tanstack/react-query"
import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"

export const fetchGetChapter = async({queryKey}) => {
  const [_key, _params] = queryKey

  const {data} = await http.get(`${_key}${_params.course_id}`)

  return data
}

export const useGetChapter = (options) => {
  return useQuery([API_ENDPOINT.GET_CHAPTER, options], fetchGetChapter)
}