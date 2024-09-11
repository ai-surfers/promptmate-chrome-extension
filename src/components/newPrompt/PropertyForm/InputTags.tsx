import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Input, InputRef, Tag, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface InputTagsProps {
    tags: string[];
    onInsert: (tag: string) => void;
    onRemove: (tag: string) => void;
}

export default function InputTags({
    tags,
    onInsert,
    onRemove,
}: InputTagsProps) {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue.trim() && !tags.includes(inputValue)) {
            onInsert(inputValue.trim());
        }
        setInputValue("");
        setInputVisible(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            handleInputConfirm();
        }, 100);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    return (
        <Card
            title="입력 값"
            size="small"
            style={{ marginBottom: "20px" }}
            type="inner"
            extra={
                <Tooltip
                    placement="left"
                    title="사용자 인풋 필드를 추가할 수 있어요"
                >
                    <InfoCircleOutlined />
                </Tooltip>
            }
        >
            <TagsContainer>
                {tags.map((tag, idx) => (
                    <Tag
                        color={TAG_COLORS[idx % TAG_COLORS.length]}
                        key={tag}
                        closable
                        onClose={() => onRemove(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
                {inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={inputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onPressEnter={handleInputConfirm}
                    />
                ) : (
                    <Tag
                        style={plusStyle}
                        icon={<PlusOutlined />}
                        onClick={showInput}
                    >
                        입력 값 추가
                    </Tag>
                )}
            </TagsContainer>
        </Card>
    );
}

const TAG_COLORS = [
    "magenta",
    "cyan",
    "blue",
    "red",
    "geekblue",
    "orange",
    "green",
    "gold",
    "lime",
    "purple",
];

const inputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
};

const plusStyle: React.CSSProperties = {
    height: 22,
    background: "#efefef",
    borderStyle: "dashed",
};

const TagsContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start", "center")};
    flex-wrap: wrap;
    gap: 5px 0;
`;
