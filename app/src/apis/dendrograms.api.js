import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const fetchSubDendrogram = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/dendrograms`, data);
  return response.data;
}

export const changeClusterName = async (data) => {
  const response = await axios.put(`${SERVER_BASE_URL}/dendrograms/naming_clusters`, data);
  return response.data;
}