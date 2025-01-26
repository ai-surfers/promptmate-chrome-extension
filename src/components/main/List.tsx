import { Button, Empty, Pagination, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPromptList } from '../../hooks/queries/prompt/useGetPromptList';
import { useMemo, useState } from 'react';
import ListItem from './ListItem';
import SortSelectBox from '../prompt/SortSelectBox';
import FilterSelectBox from '../prompt/FilterSelectBox';
import { SortBy } from '../../core/Prompt';
import { SmileTwoTone } from '@ant-design/icons';
import Search from './Search';

interface ListProps {
	type: string;
	onChangeTab?: (tab: string) => void;
}
export default function List({ type, onChangeTab }: ListProps) {
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [query, setQuery] = useState<string | undefined>();
	const [sortBy, setSortBy] = useState<string>(Object.keys(SortBy)[0]);
	const [categories, setCategories] = useState<string>();
	const { data: promptListData } = useGetPromptList({
		view_type: type,
		page: page,
		query: query,
		sort_by: sortBy,
		categories: categories,
	});

	// 페이지 변경 시,
	function handleOnChange(page: number, pageSize: number) {
		setPage(page);
	}

	// 검색어 입력 및 초기화 시,
	function handleOnEnter(value: string) {
		if (value === '') setQuery(undefined);
		else setQuery(value);
	}

	function handleOnClear() {
		setQuery(undefined);
	}

	const EmptyResult = useMemo(() => {
		const handleOnChangeTab = () => {
			if (onChangeTab) onChangeTab('open');
		};

		if (type === 'starred')
			return (
				<Result
					icon={<SmileTwoTone />}
					subTitle="즐겨찾는 프롬프트를 추가해 시간을 절약하세요"
					extra={
						<Button type="primary" style={{ width: '100%' }} onClick={handleOnChangeTab}>
							프롬프트 둘러보러 가기
						</Button>
					}
				/>
			);

		return <Result icon={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />} />;
	}, [type, onChangeTab]);

	return (
		<div className="-mx-5 -my-4">
			<div className="bg-white px-5 py-4 flex flex-col gap-2.5">
				<Search onEnter={handleOnEnter} onClear={handleOnClear} />
				<FilterContainer>
					<FilterSelectBox onChange={(values) => setCategories(values)} />
					<SortSelectBox
						onSelect={(value) => {
							setSortBy(value);
						}}
					/>
				</FilterContainer>
			</div>

			{!promptListData?.data.page_meta_data.total_count && <>{EmptyResult}</>}

			<div className="flex flex-col gap-2.5 px-5 py-4 bg-gray-50">
				{promptListData?.data.prompt_info_list.map((pt) => (
					<ListItem key={pt.id} prompt={pt} onClick={() => navigate(`/prompt/${pt.id}`)} />
				))}

				<Pagination
					className="w-full items-center justify-center"
					total={promptListData?.data.page_meta_data.total_count}
					pageSize={10}
					onChange={handleOnChange}
					showSizeChanger={false}
				/>
			</div>
		</div>
	);
}

const FilterContainer = styled.div`
    width: 100%;
    ${({ theme }) => theme.mixins.flexBox('row', 'flex-end', 'flex-end')};
    gap: 10px;
`;
