import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../service/client";
import { CreatePromptRequest } from "../../mutations/prompt/usePostPrompt";

/**
 * GetPromptResponse
 */
export interface GetPromptResponse extends CreatePromptRequest {
    author_nickname: string;
    star: number;
    usages: number;
    created: string;
    is_starred_by_user: boolean;
    created_at: string;
    id?: string;
}

/**
 *  프롬프트 조회하기
 */
const getPrompt = async (prompt_id: string) => {
    const { data } = await GET<GetPromptResponse>(`/prompts/${prompt_id}`);
    return data;
};

export const useGetPrompt = (prompt_id: string) => {
    const QUERY_KEY = PROMPT_KEYS.detail(prompt_id);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => getPrompt(prompt_id).then((res) => res),
    });

    return { data, isLoading, isError, refetch };
};
