import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const getDendrogram = async (id) => {
  const response = await axios.get(`${SERVER_BASE_URL}/hierarchical_clusters`, id);
  return response.data;
}

export const getSubDendrogram = async (id, data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/hierarchical_clusters/sub_hierarchical_clusters`, id, data);
  return response.data;
}