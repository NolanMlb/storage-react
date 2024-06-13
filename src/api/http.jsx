import axios from "axios";

function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("user-token");
    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("user-refresh-token");
    return refreshToken;
}
const instance = axios.create({
    baseURL: `https://storageapp.com/api`,
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

instance.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
      const originalConfig = error.config;
      if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
              const refreshToken = getLocalRefreshToken();
              const response = await instance.post('users/refresh-token', { refreshToken: refreshToken});
              window.localStorage.setItem("user-token", response.data.token);
              return instance(originalConfig);
          } catch (_error) {
              return Promise.reject(_error);
          }
      }
      return Promise.reject(error);
  }
);

export default instance