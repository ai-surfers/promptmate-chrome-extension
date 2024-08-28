import styled from "styled-components";
import styles from "../tutorial.styles";
import FakePrompt from "./FakePrompt";

interface Tutorial3Props {
    onNext: () => void;
}
export default function Tutorial3({ onNext }: Tutorial3Props) {
    return (
        <styles.Container2>
            <styles.Wrapper style={{ flex: 2 }}>
                <styles.Title>내용 입력하기</styles.Title>
                <styles.Subtitle>
                    이미 만들어진 템플릿에 내용만 입력하세요
                </styles.Subtitle>
            </styles.Wrapper>

            <Line />

            <PromptContainer style={{ flex: 8 }}>
                <FakePrompt onNext={onNext} />
            </PromptContainer>
        </styles.Container2>
    );
}

const PromptContainer = styled.div`
    overflow: scroll;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background: #efefef;
    margin: 20px 0;
`;
