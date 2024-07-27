import { Button } from "antd";
import styled from "styled-components";

const dummyAd = {
    ad_description: "test_description",
    ad_picture_url:
        "https://velog.velcdn.com/images/jaekim/post/b5699843-ed32-411a-b307-de4c637de110/image.png",
    ad_landing_page_url: "https://naver.com",
};
interface AdType {
    ad_description: string;
    ad_landing_page_url: string;
    ad_picture_url: string;
}
interface AdContentProps {
    ad?: AdType;
}
export default function AdContent({ ad = dummyAd }: AdContentProps) {
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
    ad?: AdType;
    closeModal: () => void;
}
export function AdFooter({ ad, closeModal }: AdFooterProps) {
    function handleGoToUrl() {
        //[TODO]
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
