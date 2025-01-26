import BookMark from '@/assets/BookMark';
import PromptHeader from '@/components/common/header/PromptHeader';
import { Chip } from '@/components/ui/chip';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight2, Copy, Eye, Play, Profile } from 'iconsax-react';
import { TabList } from '../../pages/prompt/PromptPage';
import { Button } from '@/components/ui/button';
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
