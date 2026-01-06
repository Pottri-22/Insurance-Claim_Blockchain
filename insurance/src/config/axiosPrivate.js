import axios from "axios";
import { auth } from "./firebase";

const privateApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

privateApi.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default privateApi;
