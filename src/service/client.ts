import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getFromStorage } from "./chrome/storage";
import { ACCESS_TOKEN } from "./chrome/storage.keys";

const getAccessToken = (): Promise<string> => {
    return new Promise((resolve) => {
        if (process.env.NODE_ENV === "production")
            getFromStorage(ACCESS_TOKEN, (token) => {
                console.log(">>", token);
                resolve(token ? token : "");
            });
        else
            resolve(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5dXNpbmtpbS5vckBnbWFpbC5jb20iLCJleHAiOjE3Mjg5ODU0Mjl9.h7TdGSDO5M7YLYBuIGAIpQFd_sTWPuQ_YY15qPJTgkc"
            );
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
        config.headers["source-location"] = `extension`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface BaseResponse<T> {
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

export const DELETE = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.delete(url, config);
};

export const PUT = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.put(url, data, config);
};

export const PATCH = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.patch(url, data, config);
};
