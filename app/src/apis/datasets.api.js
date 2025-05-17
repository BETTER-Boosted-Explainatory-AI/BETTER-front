import axios from 'axios';

import { SERVER_BASE_URL } from "../consts/api";

export const fetchLabels = async (datasetName) => {
  const response = await axios.get(`${SERVER_BASE_URL}/datasets/${datasetName}/labels`);
  return response.data.data;
}