import styled from "styled-components";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import StarButton from "../common/button/StarButton";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/queries/auth/useGetUser";

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
            {author === data?.data.nickname && <ModifyButton id={id} />}
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
    const navigate = useNavigate();

    function handleOnModify() {
        navigate(`/prompt/${id}/modify`);
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
