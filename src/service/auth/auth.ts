import { GET, POST } from "../client";
import { LoginResponse, UserResponse } from "./auth.model";

/**
 *  로그인
 */
export async function login(token: string) {
    return await POST<LoginResponse>(`/login`, { google_access_token: token });
}

/**
 *  로그인
 */
export async function getUser() {
    return await GET<UserResponse>(`/me`);
}
