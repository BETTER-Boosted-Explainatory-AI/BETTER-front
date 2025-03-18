import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const getDendrogram = async (id) => {
  const response = await axios.get(`${SERVER_BASE_URL}/dendrogram`, id);
  return response.data;
}