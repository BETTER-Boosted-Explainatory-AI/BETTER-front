import axios from "axios";
import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";
import { SERVER_BASE_URL } from "../consts/api";

export async function Register(email, password) {
  return measurePerformance(
    () =>
      axios
        .post(`${SERVER_BASE_URL}/api/register`, { email, password })
        .then(res => res.data),
    "Register"
  );
}

export async function Login(email, password) {
  return measurePerformance(
    () =>
      axios
        .post(`${SERVER_BASE_URL}/api/login`, { email, password }, { withCredentials: true })
        .then(res => res.data),
    "Login"
  );
}

export async function confirmRegistration(id, email, confirmation_code) {
  return measurePerformance(
    () =>
      axios
        .post(`${SERVER_BASE_URL}/api/confirm`, { id, email, confirmation_code })
        .then(res => res.data),
    "confirmRegistration"
  );
}

export async function LoggedUser() {
  return measurePerformance(
    () => axiosInstance.get(`/api/me`).then(res => res.data),
    "LoggedUser"
  );
}

export async function Logout() {
  return measurePerformance(
    () =>
      axios
        .post(`${SERVER_BASE_URL}/api/logout`, {}, { withCredentials: true })
        .then(res => res.data),
    "Logout"
  );
}
