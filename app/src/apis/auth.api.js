// Example usage in your frontend (e.g., in a component or action)
import axios from "axios";
// import { getTokensFromUrl } from "../utils/CognitoAuth_TBD";

import { SERVER_BASE_URL } from "../consts/api";

// export async function sendTokenToBackend() {
//   const Tokens = getTokensFromUrl();
// const idToken = Tokens.id_token;
//   if (!idToken) return;

//   await axios.post(
//     `${SERVER_BASE_URL}/cognito/callback`,
//     {}, // or any data you want to send
//     {
//       headers: {
//         Authorization: `Bearer ${idToken}`,
//       },
//     }
//   );
// }

export async function register(email, password) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/register`,
    {email, password},
  )
  return response.data;
}

export async function login(email, password) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/login`,
    {email, password},
    { withCredentials: true }
  )
  return response.data;
}

export async function confirmRegistration(id, email, confirmation_code) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/confirm`,
    {id, email, confirmation_code},
  )
  return response.data;
}

export async function LoggedUser() {
  const response = await axios.get(
    `${SERVER_BASE_URL}/me`,
    { withCredentials: true }
  )
  return response.data;
}