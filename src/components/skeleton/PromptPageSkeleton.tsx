import PromptHeader from '@/components/common/header/PromptHeader';
import Spinner from '@/components/common/Spinner/Spinner';

const PromptPageSkeleton = () => {
	return (
		<div className="w-full h-[calc(100vh-60px)] bg-white">
			<PromptHeader />

			<div className="w-full h-full flex justify-center items-center">
				<Spinner />
			</div>
		</div>
	);
};

export default PromptPageSkeleton;
