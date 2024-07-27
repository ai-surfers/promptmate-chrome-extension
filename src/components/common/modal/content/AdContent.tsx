import { Button } from "antd";
import styled from "styled-components";
import { AdType } from "../../../../service/prompt/prompt.model";
import { openUrlInNewTab } from "../../../../service/chrome/utils";

interface AdContentProps {
    ad: AdType;
}

export default function AdContent({ ad }: AdContentProps) {
    return (
        <AdContentContainer>
            <AdContentImage src={ad.ad_picture_url} />
            {ad.ad_description}
        </AdContentContainer>
    );
}

const AdContentContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 10px;
    margin: 20px 0;

    ${({ theme }) => theme.fonts.subtitle};
`;
const AdContentImage = styled.img`
    width: 200px;
    height: 200px;
    background: gray;
    object-fit: center;
`;

interface AdFooterProps {
    ad: AdType;
    closeModal: () => void;
}
export function AdFooter({ ad, closeModal }: AdFooterProps) {
    function handleGoToUrl() {
        openUrlInNewTab(ad.ad_landing_page_url);
        closeModal();
    }

    return (
        <AdFooterContainer>
            <Button onClick={closeModal}>나중에 하기</Button>
            <Button type="primary" onClick={handleGoToUrl}>
                들어가기
            </Button>
        </AdFooterContainer>
    );
}

const AdFooterContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    margin: 5px 0;
`;
