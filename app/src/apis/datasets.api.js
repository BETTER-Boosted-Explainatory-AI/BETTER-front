import axios from 'axios';
import { measurePerformance } from "../utils/performance";
import { SERVER_BASE_URL } from "../consts/api";

export const fetchLabels = async (datasetName) => {
  return measurePerformance(
    () => axios.get(`${SERVER_BASE_URL}/api/datasets/${datasetName}/labels`).then(res => res.data.data),
    "fetchLabels"
  );
};