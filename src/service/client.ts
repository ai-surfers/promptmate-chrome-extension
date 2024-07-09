import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getFromStorage } from "./chrome/storage";
import { ACCESS_TOKEN } from "./chrome/storage.keys";

const getAccessToken = (): Promise<string> => {
    return new Promise((resolve) => {
        getFromStorage(ACCESS_TOKEN, (token) => {
            console.log(">>", token);
            resolve(token ? token : "");
        });
    });
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface BaseResponse<T> {
    success: boolean;
    detail: string;
    data: T;
}

export const GET = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.get(url, config);
};

export const POST = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.post(url, data, config);
};

// const PUT = async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
// ): Promise<BaseResponse<T>> => {
//     const response: AxiosResponse<BaseResponse<T>> = await API.put(
//         url,
//         data,
//         config
//     );
//     return response.data;
// };

// const PATCH = async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
// ): Promise<BaseResponse<T>> => {
//     const response: AxiosResponse<BaseResponse<T>> = await API.patch(
//         url,
//         data,
//         config
//     );
//     return response.data;
// };

// const DELETE = async <T>(
//     url: string,
//     config?: AxiosRequestConfig
// ): Promise<BaseResponse<T>> => {
//     const response: AxiosResponse<BaseResponse<T>> = await API.delete(
//         url,
//         config
//     );
//     return response.data;
// };
