import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function All() {
    const navigate = useNavigate();
    const id = "669d1c58070edcb74df8b1a9";

    return (
        <AllContainer>
            <Card
                style={{ width: "100%" }}
                onClick={() => navigate(`/prompt/${id}`)}
                extra={<a href="#">사용하기</a>}
                title="마케팅 카피라이트 만들기"
            >
                <div style={{ fontWeight: "700" }}></div>

                <div style={{ color: "#727272" }}>
                    제품명과 청중, 원하는 톤을 작성하면 찰떡같은 카피라이팅을
                    만들어줘요
                </div>
            </Card>
            <Card
                style={{ width: "100%" }}
                onClick={() => navigate(`/prompt/${id}`)}
                extra={<a href="#">사용하기</a>}
                title="파워포인트 작성 치트키"
            >
                <div style={{ fontWeight: "700" }}></div>

                <div style={{ color: "#727272" }}>
                    주제와 청중을 입력하면 근사한 파워포인트 초안을 만들어주는
                    프롬프트
                </div>
            </Card>
            <Card
                style={{ width: "100%" }}
                onClick={() => navigate(`/prompt/${id}`)}
                extra={<a href="#">사용하기</a>}
                title="영한번역"
            >
                <div style={{ fontWeight: "700" }}></div>

                <div style={{ color: "#727272" }}>
                    영어를 자연스러운 한국어로 번역해줘요
                </div>
            </Card>
        </AllContainer>
    );
}

const AllContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;
`;
