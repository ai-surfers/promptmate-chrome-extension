import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/button/Button";
import Input from "../../components/common/input/Input";
import { useState } from "react";
import { useAlert } from "../../hooks/useAlert";

import Header from "../../components/common/header/Header";
import { Wrapper } from "../../layouts/Layout";

export default function PromptPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();

    function handleUsePrompt() {}
    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                <SubTitle>제목 {id}</SubTitle>
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

                <Button title="사용" onClick={handleUsePrompt} />
            </Wrapper>
        </>
    );
}

const SubTitle = styled.h3`
    ${({ theme }) => theme.fonts.h3};
    color: ${({ theme }) => theme.colors.main};

    margin: 5px 0;
`;
