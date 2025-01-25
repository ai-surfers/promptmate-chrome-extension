import { useQuery } from '@tanstack/react-query';
import { GET } from '../../../service/client';
import { USER_KEYS } from '../QueryKeys';

/**
 * GetUserResponse
 */
export interface GetUserResponse {
	email: string;
	nickname: string;
	picture: string;
	total_prompt_executions: number;
}

/**
 *  유저 정보 조회하기
 */
const getUser = async () => {
	const { data } = await GET<GetUserResponse>(`/me`);
	return data;
};

export const useGetUser = () => {
	const QUERY_KEY = USER_KEYS;

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => getUser().then((res) => res),
	});

	return { data, isLoading, isError, refetch };
};
