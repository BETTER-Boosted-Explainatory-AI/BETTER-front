import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const postQuery = async (file, current_model_id, graph_type) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('current_model_id', current_model_id);
  formData.append('graph_type', graph_type);

  const response = await axios.post(
    `${SERVER_BASE_URL}/query`,
    formData,
    { withCredentials: true }
  );
  return response.data;
}