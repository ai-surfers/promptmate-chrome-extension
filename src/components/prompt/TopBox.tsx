import styled from "styled-components";
import { DeleteOutlined, EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import StarButton from "../common/button/StarButton";
import { useGetUser } from "../../hooks/queries/auth/useGetUser";
import { openPocketPromptInNewTab } from "../../service/chrome/utils";
import { useDeletePrompt } from "@/hooks/mutations/prompt/useDeletePrompt";
import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";
import { useNavigate } from "react-router-dom";

interface TopBoxProps {
    id: string;
    isFavorite: boolean;
    author: string;
    onInformationClick: () => void;
}

export default function TopBox({
    isFavorite,
    id,
    author,
    onInformationClick,
}: TopBoxProps) {
    const { data } = useGetUser();

    return (
        <InfoBoxWrapper>
            <StarButton id={id} isFavorite={isFavorite} />
            <InfoButton onInformationClick={onInformationClick} />
            {author === data?.data.nickname && (
                <>
                    <ModifyButton id={id} />
                    <DeleteButton id={id} />
                </>
            )}
        </InfoBoxWrapper>
    );
}

interface InfoButtonProps {
    onInformationClick: () => void;
}
export const InfoButton = ({ onInformationClick }: InfoButtonProps) => {
    return (
        <Tooltip title="information">
            <Button
                shape="circle"
                icon={<InfoOutlined />}
                onClick={onInformationClick}
            />
        </Tooltip>
    );
};

export const InfoBoxWrapper = styled.div`
    width: 100%;

    ${({ theme }) => theme.mixins.flexBox("row", "flex-end", "center")};
    gap: 10px;
`;

interface ModifyButtonProps {
    id: string;
}
export const ModifyButton = ({ id }: ModifyButtonProps) => {
    function handleOnModify() {
        openPocketPromptInNewTab(`prompt-edit/${id}`);
    }

    return (
        <Tooltip title="modify">
            <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={handleOnModify}
            />
        </Tooltip>
    );
};

export const DeleteButton = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { openAlert, closeAlert } = useAlert();

    const navigate = useNavigate();

    const { mutate: deletePrompt } = useDeletePrompt({
        onSuccess(res) {
            console.log(">>", res);

            const { success, detail } = res;

            if (!success) {
                console.log(`${detail}`);
                alert(`${detail}`);
                return;
            }

            openAlert({
                content: id + "가 성공적으로 삭제되었습니다",
                callback() {
                    closeAlert();
                    queryClient.invalidateQueries({
                        queryKey: PROMPT_KEYS.detail(id),
                    });
                    queryClient.invalidateQueries({
                        queryKey: PROMPT_KEYS.lists(),
                    });

                    navigate("/", { replace: true });
                },
            });
        },
        onError(e) {
            console.log(">");
        },
    });

    const handleOk = () => {
        setIsModalOpen(false);
        deletePrompt(id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Tooltip title="delete">
            <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => setIsModalOpen(true)}
            />

            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                정말로 프롬프트를 삭제하시겠습니까?
            </Modal>
        </Tooltip>
    );
};
