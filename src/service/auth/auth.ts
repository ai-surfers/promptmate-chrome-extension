import { POST } from "../client";
import { LoginResponse } from "./auth.model";

/**
 *  로그인
 */
export async function login(token: string) {
    return await POST<LoginResponse>(`/login?token=${token}`);
}
