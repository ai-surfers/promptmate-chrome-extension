import { Eye, Play } from 'iconsax-react';
import { Skeleton } from '../ui/skeleton';

export default function ListSkeleton() {
	return (
		<div className="flex flex-col gap-2.5 px-5 py-4 bg-gray-50">
			{[...Array(5)].map((_, i) => (
				<ListItemSkeleton key={i} />
			))}
		</div>
	);
}

const ListItemSkeleton = () => {
	return (
		<div className="bg-white rounded-[12px] border border-gray-100 p-4 flex flex-col gap-3 cursor-pointer hover:shadow-sm relative">
			<Skeleton>
				<h3 className="b1_18_semi text-gray-600">파워포인트 작성 치트키</h3>
			</Skeleton>

			<Skeleton>
				<p className="b3_14_reg text-gray-400 line-clamp-3">
					주제와 청중을 입력하면 근사한 파워포인트 초안을 만들어주는 프롬프트 최대로 늘어나면
					여기까지 늘
				</p>
			</Skeleton>

			<hr className="border border-gray-100" />

			<div className="w-full flex justify-end">
				<Skeleton className="flex gap-5">
					<div className="flex gap-1 items-center c1_12_reg text-gray-400">
						<Eye size={16} />
						<span>34</span>
					</div>
					<div className="flex gap-1 items-center c1_12_reg text-gray-400">
						<Play size={16} />
						<span>12</span>
					</div>
					<div className="flex gap-1 items-center c1_12_reg text-gray-400">
						<Play size={16} />
						<span>12</span>
					</div>
				</Skeleton>
			</div>
		</div>
	);
};
