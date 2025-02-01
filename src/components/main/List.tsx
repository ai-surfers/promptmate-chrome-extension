import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetPromptList } from '../../hooks/queries/prompt/useGetPromptList';
import { Suspense, useState } from 'react';
import ListItem from './ListItem';
import SortSelectBox from '../prompt/SortSelectBox';
import FilterSelectBox from '../prompt/FilterSelectBox';
import { SortBy } from '../../core/Prompt';
import Search from './Search';
import ListSkeleton from './ListSkeleton';
import ListEmpty from './ListEmpty';
import { TabType } from '@/pages/home/HomePage';
import { ErrorBoundary } from '@sentry/react';
import ListError from './ListError';
import VOCDialog from '../common/dialog/VOCDialog';
import KindSelectBox from '../prompt/KindSelectBox';

interface ListProps {
	type: TabType;
	onChangeTab: (tab: TabType) => void;
}
export default function List({ type, onChangeTab }: ListProps) {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState<string | undefined>();
	const [sortBy, setSortBy] = useState<string>(Object.keys(SortBy)[0]);
	const [categories, setCategories] = useState<string>();
	const [kind, setKind] = useState<'text' | 'image'>('text');

	// 페이지 변경 시,
	function handleOnChange(page: number, pageSize: number) {
		setPage(page);
	}

	// 검색어 입력 및 초기화 시,
	function handleOnEnter(value: string) {
		if (value === '') setQuery(undefined);
		else setQuery(value);
	}

	// 필터 변경 시,
	function handleOnFilterChange(values: string | undefined) {
		setCategories(values);
		setPage(1);
	}

	// 프롬프트 종류 변경 시,
	function handleOnKindChange(kind: 'text' | 'image') {
		setKind(kind);
	}

	function handleOnClear() {
		setQuery(undefined);
		setPage(1);
		setCategories(undefined);
	}

	return (
		<div className="pt-4 h-full flex flex-col">
			<div className="px-5 py-3 flex justify-between items-center">
				<KindSelectBox kind={kind} onChange={handleOnKindChange} />
				<VOCDialog />
			</div>
			<div className="bg-white px-5 py-4 flex flex-col gap-2.5">
				<Search onEnter={handleOnEnter} onClear={handleOnClear} />
				<div className="flex gap-2.5 justify-end items-center w-full">
					<FilterSelectBox onChange={handleOnFilterChange} onClear={handleOnClear} />
					<SortSelectBox
						onSelect={(value) => {
							setSortBy(value);
						}}
					/>
				</div>
			</div>

			<ErrorBoundary fallback={<ListError />}>
				<Suspense fallback={<ListSkeleton />}>
					<ListContainer
						page={page}
						type={type}
						query={query}
						sortBy={sortBy}
						categories={categories}
						handleOnTabChange={onChangeTab}
						handleOnPageChange={handleOnChange}
					/>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}

interface ListContainerProps {
	page: number;
	type: TabType;
	query?: string;
	sortBy: string;
	categories?: string;
	handleOnTabChange: (tab: TabType) => void;
	handleOnPageChange: (page: number, pageSize: number) => void;
}

const ListContainer = ({
	page,
	type,
	query,
	sortBy,
	categories,
	handleOnTabChange,
	handleOnPageChange,
}: ListContainerProps) => {
	const { data: promptListData } = useGetPromptList({
		view_type: type,
		page: page,
		query: query,
		sort_by: sortBy,
		categories: categories,
	});

	const navigate = useNavigate();

	if (!promptListData.data.prompt_info_list.length) {
		return <ListEmpty type={type} onTabChange={handleOnTabChange} />;
	}

	return (
		<div className="flex flex-col gap-2.5 px-5 pt-4 pb-8 bg-gray-50 justify-between flex-1">
			<div className="flex flex-col gap-2.5">
				{promptListData.data.prompt_info_list.map((pt) => (
					<ListItem key={pt.id} prompt={pt} onClick={() => navigate(`/prompt/${pt.id}`)} />
				))}
			</div>

			<Pagination
				className="w-full items-center justify-center"
				current={promptListData.data.page_meta_data.current_page}
				total={promptListData.data.page_meta_data.total_count}
				pageSize={10}
				onChange={handleOnPageChange}
				showSizeChanger={false}
			/>
		</div>
	);
};
