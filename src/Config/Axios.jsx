import axios from "axios";
const BASE_URL = "http://localhost/irembo-backend";
// const BASE_URL = "http://192.168.1.109/ahuriire/irembo";
// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
