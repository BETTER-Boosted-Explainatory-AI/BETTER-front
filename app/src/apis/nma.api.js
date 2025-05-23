import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const postNma = async (formData) => {

  const response = await axios.post(
    `${SERVER_BASE_URL}/nma`,
    formData,
    { withCredentials: true }
  );
  return response.data;
}