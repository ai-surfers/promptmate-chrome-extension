import { atom } from "recoil";
import { UserResponse } from "../service/auth/auth.model";

type UserType = {
    isLogin: boolean;
    accessToken: string | null;
    user: UserResponse | null;
};

export const initialUserState = {
    isLogin: false,
    accessToken: null,
    user: null,
};

export const userState = atom<UserType>({
    key: "userState",
    default: initialUserState,
});
