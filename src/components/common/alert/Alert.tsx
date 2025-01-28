import { useAlert } from '../../../hooks/useAlert';
import { Button } from '@/components/ui/button';

const Alert = () => {
	const { alertData, closeAlert } = useAlert();

	function handleOnClick() {
		if (alertData.callBack) alertData.callBack();
		else closeAlert();
	}

	return (
		<>
			{alertData.isOpen && (
				<>
					<div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10" />
					<div className="bg-white absolute top-0 left-0 right-0 bottom-0 m-auto z-10 p-5 rounded-[12px] w-fit h-fit min-w-[18.7rem]">
						<p className="text-gray-900 b3_14_med p-4 whitespace-pre-wrap text-center">
							{alertData.content}
						</p>
						<Button onClick={handleOnClick} className="w-full mt-4" size={44}>
							확인
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default Alert;
