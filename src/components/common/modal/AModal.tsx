import { useModal } from "../../../hooks/useModal";
import { Modal } from "antd";

const AModal = () => {
    const { modalData, closeModal } = useModal();

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
