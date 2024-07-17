import styled from "styled-components";
import { StarOutlined, StarFilled, InfoOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface TopBoxProps {
    isFavorite: boolean;
    onFavoriteClick: () => void;
    onInformationClick: () => void;
}
export default function TopBox({
    isFavorite,
    onFavoriteClick,
    onInformationClick,
}: TopBoxProps) {
    return (
        <InfoBoxWrapper>
            <Tooltip title="favorite">
                <Button
                    shape="circle"
                    icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                    onClick={onFavoriteClick}
                />
            </Tooltip>

            <Tooltip title="information">
                <Button
                    shape="circle"
                    icon={<InfoOutlined />}
                    onClick={onInformationClick}
                />
            </Tooltip>
        </InfoBoxWrapper>
    );
}

const InfoBoxWrapper = styled.div`
    width: 100%;

    ${({ theme }) => theme.mixins.flexBox("row", "flex-end", "center")};
    gap: 10px;
`;
