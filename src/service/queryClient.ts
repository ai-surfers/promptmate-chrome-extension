import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "./client";
import eventEmitter, { ErrorArgs, EventType } from "../eventEmitter";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onSuccess(data, query) {},
        onError: (error, query) => {
            console.log("🔯 Query onError");
            console.log(error, query.meta);

            // handleAxiosError(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            console.log("🔯 Mutation onError");
            console.log(error);

            handleAxiosError(error);
        },
    }),
});

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

function handleAxiosError(error: any) {
    if (isAxiosError(error) && error.response) {
        const errorCode = error.response?.status;
        const errorMessage = (error.response.data as BaseResponse<string>)
            .detail;

        const args: ErrorArgs = {
            code: errorCode,
            message: errorMessage,
        };

        eventEmitter.emit(EventType.Error, args);
    }
}
