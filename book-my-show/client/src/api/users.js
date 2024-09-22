import { message } from "antd";
import axiosInstance from "./index";

// register a new user

export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("/api/users/register", value);
        return response.data;
    } catch (error) {
        console.log("err : ", error?.response?.data);
        return message.error(error?.response?.data?.message);
    }
}

export const LoginUser = async (values) => {
    try {
        const response = await axiosInstance.post("/api/users/login", values);
        return response.data;
    } catch (error) {
        console.log("err : ", error?.response?.data);
        return message.error(error?.response?.data?.message)
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        console.log(error);
        return message.error(error?.response?.data?.message);
    }
}