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

API.interceptors.response.use((response) => {
    switch (response.data.status_code) {
        // case 4220: // (4220) JWT 토큰이 필요합니다.
        // case 4998: // (4998) 회원가입이 완료되지 않았습니다.
        //     // console.log("nuxtApp.route.path", nuxtApp._route.path);
        //     // if (nuxtApp._route.path !== "/signin" ) {
        //     // const errorMsg = `[${response.data.code}] - ${response.data.message}`;
        //     // console.error(errorMsg);
        //     // ("/signin");
        //     // }
        //     return response;

        default:
            return response;
    }
});

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

export const DELETE = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.delete(url, config);
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
