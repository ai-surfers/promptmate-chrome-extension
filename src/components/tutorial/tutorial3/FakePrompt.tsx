import styled from "styled-components";
import dummies from "../dummies.json";
import { InfoBoxWrapper, InfoButton } from "../../prompt/TopBox";
import { InputFormat } from "../../../hooks/mutations/prompt/usePostPrompt";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Button, Tooltip } from "antd";
import { StarOutlined } from "@ant-design/icons";

const data = dummies.data;

export default function FakePrompt() {
    return (
        <>
            <FakeTopBox />

            <Title>{data.title}</Title>
            <Description>{data.description}</Description>

            {data.user_input_format.map((opt) => (
                <FakeProperty key={opt.name} option={opt as InputFormat} />
            ))}
        </>
    );
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    margin: 10px 0;
`;

const Description = styled.h2`
    ${({ theme }) => theme.fonts.description};
    color: ${({ theme }) => theme.colors.deep_gray};
    margin-bottom: 20px;
`;

const FakeProperty = ({ option }: { option: InputFormat }) => {
    const [value, setValue] = useState<string | undefined>();
    function handleOnclick() {
        setValue(option.placeholder.replace("ex. ", ""));
    }

    return (
        <PropertyContainer>
            <PropertyTitle>{option.name}</PropertyTitle>

            {option.type === "text" && (
                <TextArea
                    placeholder={option.placeholder}
                    onClick={handleOnclick}
                    value={value}
                />
            )}
        </PropertyContainer>
    );
};

const PropertyContainer = styled.div`
    margin: 30px 0;
`;

const PropertyTitle = styled.h3`
    ${({ theme }) => theme.fonts.subtitle};

    margin: 5px 0;
`;

const FakeTopBox = () => {
    return (
        <InfoBoxWrapper>
            <Tooltip title="favorite">
                <Button shape="circle" icon={<StarOutlined />} />
            </Tooltip>
            <InfoButton onInformationClick={() => {}} />
        </InfoBoxWrapper>
    );
};
