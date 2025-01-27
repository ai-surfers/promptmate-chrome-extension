import EmptyLetterColor from '@/assets/EmptyLetterColor';
import { Button } from '../ui/button';
import EmptyLetter from '@/assets/EmptyLetter';
import { TabType } from '@/pages/home/HomePage';

interface Props {
	type: TabType;
	onTabChange: (tab: TabType) => void;
}
const ListEmpty = ({ type, onTabChange }: Props) => {
	if (type === 'starred') {
		return (
			<div className="w-full h-[calc(100%-80px)] px-5">
				<div className="h-full w-full bg-gray-50 rounded-[8px] p-4 flex flex-col items-center justify-center gap-4">
					<EmptyLetterColor width={141} />
					<div className="flex flex-col gap-3 items-center">
						<h3 className="b2_16_semi text-gray-700 text-center">
							즐겨찾는 프롬프트를 저장해 <br />
							시간을 절약하세요!
						</h3>
						<Button variant="secondary" size={44} onClick={() => onTabChange('open')}>
							프롬프트 둘러보러 가기
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (type === 'my') {
		return (
			<div className="w-full h-[calc(100%-80px)] px-5">
				<div className="h-full w-full bg-gray-50 rounded-[8px] p-4 flex flex-col items-center justify-center gap-4">
					<EmptyLetter width={141} />
					<div className="flex flex-col gap-1 items-center">
						<h3 className="b2_16_semi text-gray-700">현재 등록한 프롬프트가 없어요</h3>
						<p className=" b3_14_reg text-gray-500">
							프롬프트를 등록하면 이곳에 나타나요 <br />
							나만의 프롬프트를 등록하러 가볼까요?
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-[calc(100%-80px)] px-5">
			<div className="h-full w-full bg-gray-50 rounded-[8px] p-4 flex flex-col items-center justify-center gap-4">
				<EmptyLetter width={141} />
				<div className="flex flex-col gap-1 items-center">
					<h3 className="b2_16_semi text-gray-700">아직 등록된 프롬프트가 없어요!</h3>
					<p className=" b3_14_reg text-gray-500">1등으로 관련 프롬프트를 등록해 볼까요?</p>
				</div>
			</div>
		</div>
	);
};

export default ListEmpty;
