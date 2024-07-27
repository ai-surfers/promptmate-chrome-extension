import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "./client";
import eventEmitter, { EventType } from "../eventEmitter";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onSuccess(data, query) {},
        onError: (error, query) => {
            console.log("🔯 Query onError");
            console.log(error);
            console.log(query.meta);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            console.log("🔯 Mutation onError");
            console.log(error);

            if (isAxiosError(error) && error.response?.status === 402) {
                const errorMessage = (
                    error.response.data as BaseResponse<string>
                ).detail;
                eventEmitter.emit(EventType.Error, errorMessage);
            }
        },
    }),
});

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}
