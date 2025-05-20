import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export async function Register(email, password) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/register`,
    {email, password},
  )
  return response.data;
}

export async function Login(email, password) {
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

export async function Logout() {
  const response = await axios.post(
    `${SERVER_BASE_URL}/logout`,
    {},
    { withCredentials: true }
  )
  return response.data;
}