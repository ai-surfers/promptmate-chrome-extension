import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/Button";
import Input from "../../components/common/input/Input";
import { useState } from "react";
import TextArea from "../../components/common/input/TextArea";

export default function PromptPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prompt, setPrompt] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div className="button" onClick={() => navigate(-1)}>
                Prompt
            </div>
            <SubTitle>제목</SubTitle>
            <Input
                value={title}
                placeholder="마케팅 카피라이트 만들기"
                onChange={(e) => setTitle(e.target.value)}
            />

            <SubTitle>설명</SubTitle>
            <Input
                value={description}
                placeholder="마케팅 카피라이팅을 만드는 프롬프트"
                onChange={(e) => setDescription(e.target.value)}
            />

            <OptionContainer>
                <Option>
                    <SubTitle>공개 범위</SubTitle>
                </Option>
                <Option>
                    <SubTitle>분야</SubTitle>
                </Option>
            </OptionContainer>

            <SubTitle>프롬프트</SubTitle>
            <TextArea
                value={prompt}
                placeholder={`너는 마케팅 전문가야. $상품 이름$에 대한 마케팅 카피라이팅을 만들어줘. 예상 청중은 $예상 청중$이고 상품의 특징은 $상품 특징$.

이들의 마음을 사로잡을 수 있는 매력적이고 센스있는 카피라이팅을 각기 다른 컨셉으로 총 3개 만들어줘`}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <Button title="추가" />
        </>
    );
}

const SubTitle = styled.h3`
    ${({ theme }) => theme.fonts.h3};
    color: ${({ theme }) => theme.colors.main};

    margin: 5px 0;
`;

const OptionContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start", "center")};
`;

const Option = styled.div`
    flex: 1;
`;
