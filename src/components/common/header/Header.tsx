import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { removeFromStorage } from '@/service/chrome/storage';
import { ACCESS_TOKEN } from '@/service/chrome/storage.keys';
import { useNavigate } from 'react-router-dom';
import { User } from 'iconsax-react';

const Header = () => {
	const navigate = useNavigate();
	const { openModal, closeModal } = useModal();

	const { userData, resetUserState } = useUser();

	function handleOnLogout() {
		openModal({
			title: '로그아웃하시겠습니까? ',
			callback: function logout() {
				removeFromStorage(ACCESS_TOKEN);
				resetUserState();

				navigate(`/`, { replace: true });
				closeModal();
			},
		});
	}

	return (
		<header className="flex px-5 py-2.5 justify-between items-center absolute top-0 z-10 bg-white h-[60px]">
			<div className="flex items-center shrink-0">
				<img src="/images/logo_icon.png" className="w-[40px] h-[40px] " />
			</div>

			{userData.isLogin && (
				<div
					className="flex items-center gap-2 max-w-[50%] px-3 py-2 border border-gray-100 rounded-[40px] text-gray-500 c1_12_reg cursor-pointer overflow-hidden"
					onClick={handleOnLogout}
				>
					<User className="text-gray-500 shrink-0" size={16} />
					<span className="truncate whitespace-nowrap">{userData.user?.nickname}</span>
				</div>
			)}
		</header>
	);
};

export default Header;
