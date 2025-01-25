import { useRecoilState } from 'recoil';
import { modalState } from '../states/modalState';
import { useCallback } from 'react';

/**
 * useModal Hook
 * @props title - 모달 타이틀
 * @props content - 모달 내부에 들어갈 컨텐츠
 * @props callback - 확인 클릭 시 실행될 함수
 */
interface ModalProps {
	title?: string;
	content?: JSX.Element | string;
	footer?: JSX.Element;
	callback?: () => any;
}

export const useModal = () => {
	const [modalData, setModalData] = useRecoilState(modalState);

	const closeModal = useCallback(() => {
		setModalData((prev) => ({
			...prev,
			isOpen: false,
		}));
	}, [setModalData]);

	const openModal = useCallback(
		({ title, content, footer, callback }: ModalProps) => {
			setModalData({
				title: title,
				isOpen: true,
				content: content,
				footer: footer,
				callBack: callback,
			});
		},
		[setModalData]
	);

	return { modalData, closeModal, openModal };
};
