import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: "/",
});

// request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = JSON.parse(localStorage.getItem("auth_token"));
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// response interceptor
// axiosInstance.interceptors.response({

// })



export default axiosInstance;