import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const fetchSubDendrogram = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/dendrograms`, data);
  return response.data;
}