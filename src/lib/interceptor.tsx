import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import store from "../redux/store";
import toast from "react-hot-toast";
import { resetUser } from "@/redux/authSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:5000"
  // baseURL: "https://twinsting-api-hdr.onrender.com"
  // headers: {
  //   "Content-Type": "application/json"
  // }
});

// Define public routes that don't require authentication
const publicRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/social-login"
];

// Helper function to check if a request URL is for a public route
const isPublicRoute = (url: string | undefined): boolean => {
  if (!url) return false;
  return publicRoutes.some((route) => url.includes(route));
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add the token if the route is not public
    if (!isPublicRoute(config.url)) {
      const token = store.getState().user.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    let errorMessage = "Something went wrong";
    if (data && typeof data === "object" && "message" in data) {
      errorMessage = data.message as string;
    }
    if (status === 401) {
      toast.error("Session expired. Please log in again.");

      if (store.getState().user.token) {
        store.dispatch(resetUser());
        localStorage.clear();
        window.location.href = "/signin";
      }
    } else {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
