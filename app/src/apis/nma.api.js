import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId
    ? `${SERVER_BASE_URL}/nma/${modelId}`
    : `${SERVER_BASE_URL}/nma`;

  const response = await axios.post(url, formData, { withCredentials: true });
  return response.data;
};