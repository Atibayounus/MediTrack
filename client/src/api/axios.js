import axios from "axios";

/**
 * TASK 5.1 - One axios instance for the whole app.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * TASK 7.4 (BONUS) - handle every 401 in one place.
 */
let onUnauthorised = () => {};
export const setUnauthorisedHandler = (fn) => {
  onUnauthorised = fn;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";
    if (status === 401 && !url.includes("/auth/me")) onUnauthorised();
    return Promise.reject(error);
  }
);

export default api;