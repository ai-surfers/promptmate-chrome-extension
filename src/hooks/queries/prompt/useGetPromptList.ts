import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../service/client";
import { GetPromptResponse } from "./useGetPrompt";

/**
 * GetPromptListRequest
 */
export interface GetPromptListRequest {
    view_type: string;
    query?: string;
    category?: string;
    sort_by?: string;
    sort_order?: string;
    limit?: number;
    page: number;
}

/**
 * GetPromptListResponse
 */
export interface GetPromptListResponse {
    prompt_info_list: GetPromptResponse[];
}

const getPromptList = async (request: GetPromptListRequest) => {
    const { data } = await GET<GetPromptListResponse>(`/prompts-list`, {
        params: request,
    });
    return data;
};

const PROMPT_LIST_QUERY_KEY = "PROMPT_LIST_QUERY_KEY";
export const useGetPromptList = (request: GetPromptListRequest) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [PROMPT_LIST_QUERY_KEY],
        queryFn: () => getPromptList(request).then((res) => res),
    });

    return { data, isLoading, isError, refetch };
};
