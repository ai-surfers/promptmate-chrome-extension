import { useModal } from '../../../hooks/useModal';
import { Modal } from 'antd';
import useErrorModal from '../../../hooks/useErrorModal';

const AModal = () => {
	const { modalData, closeModal } = useModal();
	useErrorModal();

	return (
		<Modal
			title={modalData.title}
			open={modalData.isOpen}
			onOk={modalData.callBack}
			onClose={closeModal}
			onCancel={closeModal}
			footer={modalData.footer}
		>
			{modalData.content}
		</Modal>
	);
};

export default AModal;
