import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onSuccess(data, query) {},
        onError: (error, query) => {
            console.log(error);
            console.log(query.meta);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            console.log(error);
        },
    }),
});
