import styled from "styled-components";
import { InfoOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import StarButton from "../common/button/StarButton";

interface TopBoxProps {
    id: string;
    isFavorite: boolean;
    onInformationClick: () => void;
}

export default function TopBox({
    isFavorite,
    id,
    onInformationClick,
}: TopBoxProps) {
    return (
        <InfoBoxWrapper>
            <StarButton id={id} isFavorite={isFavorite} />

            <InfoButton onInformationClick={onInformationClick} />
        </InfoBoxWrapper>
    );
}

interface InfoButtonProps {
    onInformationClick: () => void;
}
const InfoButton = ({ onInformationClick }: InfoButtonProps) => {
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

const InfoBoxWrapper = styled.div`
    width: 100%;

    ${({ theme }) => theme.mixins.flexBox("row", "flex-end", "center")};
    gap: 10px;
`;
