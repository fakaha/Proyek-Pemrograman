import { useQuery } from "@tanstack/react-query"
import http from "../../utils/http"
import { API_ENDPOINT } from "../../utils/api-endpoint"

export const fetchUser = async({queryKey}) => {
  const [_key, _params] = queryKey

  const {data} = await http.get(`${_key}?page=${_params.page}&limit=${_params.limit}`)

  return data
}

export const useUser = (options) => {
  return useQuery([API_ENDPOINT.GET_ALL_USER, options], fetchUser)
}