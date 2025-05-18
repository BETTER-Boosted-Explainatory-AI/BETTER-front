// Example usage in your frontend (e.g., in a component or action)
import axios from "axios";
import { getTokensFromUrl } from "../utils/cognitoAuth";

import { SERVER_BASE_URL } from "../consts/api";

export async function sendTokenToBackend() {
  const Tokens = getTokensFromUrl();
const idToken = Tokens.id_token;
  if (!idToken) return;

  await axios.post(
    `${SERVER_BASE_URL}/cognito/callback`,
    {}, // or any data you want to send
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
}