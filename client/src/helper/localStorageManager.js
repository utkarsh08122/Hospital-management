import axios from "axios";

export const KEY_ACCESS_TOKEN = "access_token";

export function getItem(key) {
  return localStorage.getItem(key);
}

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeItem(key) {
  localStorage.removeItem("accessToken");
  window.localStorage.removeItem("accessToken");
}

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
