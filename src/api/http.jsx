import axios from "axios";

function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("user-token");
    return accessToken;
}
const instance = axios.create({
    baseURL: `http://${import.meta.env.VITE_SPRING_HOST}:${import.meta.env.VITE_SPRING_PORT}/api`,
    headers: {
      "Content-Type": "application/json",
    },
});
instance.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer "+token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default instance