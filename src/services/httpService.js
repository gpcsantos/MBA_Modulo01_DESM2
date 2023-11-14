import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://react-election-backend-gpcsantos.glitch.me/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
