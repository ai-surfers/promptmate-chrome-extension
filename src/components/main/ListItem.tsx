import { Card } from "antd";
import { GetPromptResponse } from "../../hooks/queries/prompt/useGetPrompt";
import StarButton from "../common/button/StarButton";
import styled from "styled-components";

interface ListItemProps {
    prompt: GetPromptResponse;
    onClick: () => void;
}

export default function ListItem({ prompt, onClick }: ListItemProps) {
    return (
        <ListItemContainer>
            <Card
                key={prompt.id}
                style={{ width: "100%" }}
                extra={
                    <StarButton
                        id={prompt.id!!}
                        isFavorite={prompt.is_starred_by_user}
                    />
                }
                title={prompt.title}
            >
                <Description>{prompt.description}</Description>
                <UseButton onClick={onClick}>사용하기</UseButton>
            </Card>
        </ListItemContainer>
    );
}

const ListItemContainer = styled.div`
    width: 100%;

    .ant-card-head-title {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .ant-card-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Description = styled.div`
    width: 100%;
    color: #727272;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
`;

const UseButton = styled.button`
    background: none;
    padding: 0;
    color: #1677ff;
    align-self: flex-end;
`;
