/**
 * LoginResponse
 */
export interface LoginResponse {
    access_token: string;
    token_type: string;
}

/**
 * UserResponse
 */
export interface UserResponse {
    email: string;
    nickname: string;
    picture: string;
    total_prompt_executions: number;
}
