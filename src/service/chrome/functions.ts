import { BaseResponse } from "../client";
import { sendRuntimeMessage } from "./messaging";

interface GetAuthResponse {
    token: string;
}
export const getAuthToken = (
    callback: (response: BaseResponse<GetAuthResponse>) => void
) => {
    sendRuntimeMessage<BaseResponse<GetAuthResponse>>("getAuthToken", callback);
};
