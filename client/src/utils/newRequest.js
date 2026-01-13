import axios from "axios";
const newRequest = axios.create({
  baseURL: "http://localhost:1111",
  withCredentials: true,
});

export default newRequest;