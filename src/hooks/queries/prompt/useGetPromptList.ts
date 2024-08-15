import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../service/client";
import { GetPromptResponse } from "./useGetPrompt";
import { PROMPT_KEYS } from "../QueryKeys";

/**
 * GetPromptListRequest
 */
export interface GetPromptListRequest {
    view_type: string;
    query?: string;
    categories?: string;
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
    page_meta_data: PromptMetaData;
}

interface PromptMetaData {
    total_pages: number;
    total_count: number;
    current_page: number;
    is_last: number;
}

const getPromptList = async (request: GetPromptListRequest) => {
    const { data } = await GET<GetPromptListResponse>(`/prompts-list`, {
        params: request,
    });
    return data;
};

export const useGetPromptList = (request: GetPromptListRequest) => {
    const QUERY_KEY = PROMPT_KEYS.list(request);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => getPromptList(request).then((res) => res),
    });

    return { data, isLoading, isError, refetch };
};
