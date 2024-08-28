import styled from "styled-components";
import dummies from "../dummies.json";
import { InfoBoxWrapper, InfoButton } from "../../prompt/TopBox";
import { InputFormat } from "../../../hooks/mutations/prompt/usePostPrompt";
import TextArea from "antd/es/input/TextArea";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Tooltip, Tour, TourProps } from "antd";
import { StarOutlined } from "@ant-design/icons";

const data = dummies.data;

export default function FakePrompt() {
    const ref1 = useRef(null);
    const propertyRefs = useRef<Record<string, PropertyRef>>({});

    const fillProperties = () => {
        for (const key in propertyRefs.current) {
            if (propertyRefs.current[key]) {
                propertyRefs.current[key].fill();
            }
        }
    };

    const steps: TourProps["steps"] = [
        {
            title: "내용 작성하기",
            description: "프롬프트에 들어갈 내용을 작성해요",
            target: () => ref1.current,
            nextButtonProps: {
                children: <>자동으로 채우기</>,
                onClick: fillProperties,
            },
        },
    ];

    return (
        <>
            <FakeTopBox />

            <Title>{data.title}</Title>
            <Description>{data.description}</Description>

            <div ref={ref1}>
                {data.user_input_format.map((option, index) => (
                    <FakeProperty
                        key={option.name}
                        option={option as InputFormat}
                        ref={(el) => {
                            if (el) propertyRefs.current[option.name] = el;
                        }}
                    />
                ))}
            </div>

            <Tour onClose={() => {}} steps={steps} zIndex={999} />
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

export interface PropertyProps {
    option: InputFormat;
}

export interface PropertyRef {
    fill: () => void;
}

const FakeProperty = forwardRef<PropertyRef, PropertyProps>(
    ({ option }, ref) => {
        const [value, setValue] = useState<string | undefined>();

        useImperativeHandle(ref, () => ({
            fill: fillValue,
        }));

        function fillValue() {
            setValue(option.placeholder.replace("ex. ", ""));
        }

        function handleOnClick() {
            fillValue();
        }

        return (
            <PropertyContainer>
                <PropertyTitle>{option.name}</PropertyTitle>

                {option.type === "text" && (
                    <TextArea
                        placeholder={option.placeholder}
                        value={value}
                        onClick={handleOnClick}
                    />
                )}
            </PropertyContainer>
        );
    }
);

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
