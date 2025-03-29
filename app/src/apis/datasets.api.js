import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const fetchDatasetLabels = async (dataset_name) => {
  const response = await axios.get(`${SERVER_BASE_URL}/datasets/${dataset_name}/labels`);
  return response.data;
}