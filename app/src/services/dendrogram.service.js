import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const fetchSubDendrogram = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/hierarchical_clusters/sub_hierarchical_clusters`, data);
  return response.data;
}