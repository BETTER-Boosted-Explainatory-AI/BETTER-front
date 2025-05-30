import axios from "axios";
import axiosInstance from "./axiosInstance";

import { SERVER_BASE_URL } from "../consts/api";

export async function Register(email, password) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/api/register`,
    {email, password},
  )
  return response.data;
}

export async function Login(email, password) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/api/login`,
    {email, password},
    { withCredentials: true }
  )
  return response.data;
}

export async function confirmRegistration(id, email, confirmation_code) {
  const response = await axios.post(
    `${SERVER_BASE_URL}/api/confirm`,
    {id, email, confirmation_code},
  )
  return response.data;
}

export async function LoggedUser() {
  const response = await axiosInstance.get(`/api/me`);
  return response.data;
}

export async function Logout() {
  const response = await axios.post(
    `${SERVER_BASE_URL}/api/logout`,
    {},
    { withCredentials: true }
  )
  return response.data;
}