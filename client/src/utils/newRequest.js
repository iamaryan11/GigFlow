import axios from "axios";
const newRequest = axios.create({
  baseURL: "https://gigflow-backend-u2ul.onrender.com",
  withCredentials: true,
});

export default newRequest;
