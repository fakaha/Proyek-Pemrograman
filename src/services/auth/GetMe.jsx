import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const fetchMe = async () => {
  return await http.get(API_ENDPOINT.GET_ME);
};

// export const useMe = () => {
//   return useQuery([API_ENDPOINT.GET_ME], fetchMe)
// }
