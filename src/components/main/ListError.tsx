import EmptyLetter from '@/assets/EmptyLetter';

const ListError = () => {
	return (
		<div className="w-full h-[calc(100%-80px)] px-5">
			<div className="h-full w-full bg-gray-50 rounded-[8px] p-4 flex flex-col items-center justify-center gap-4">
				<div className="flex flex-col gap-1 items-center">
					<h3 className="b2_16_semi text-gray-700">프롬프트를 불러올 수 없습니다</h3>
					<p className=" b3_14_reg text-gray-500">잠시 후 다시 시도해 주세요</p>
				</div>
			</div>
		</div>
	);
};

export default ListError;
