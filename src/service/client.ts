import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface BaseResponse<T> {
    success: boolean;
    status_code: number;
    message: string;
    data: T;
    access_token?: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({
    baseURL: BASE_URL,
    validateStatus: function (status) {
        return true;
    },
});

API.interceptors.request.use(
    (config) => {
        // const { accessToken } = useUserStore();

        // if (accessToken) {
        //     config.headers["Authorization"] = `Bearer ${accessToken}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const GET = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<BaseResponse<T>> => {
    const response: AxiosResponse<BaseResponse<T>> = await API.get(url, config);
    return response.data;
};

// [TODO] Response 원복 필요
export const POST = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
    // <BaseResponse<T>
    const response: AxiosResponse = await API.post(url, data, config);
    return response;
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
