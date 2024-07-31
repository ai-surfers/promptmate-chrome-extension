import styled from "styled-components";
import { forwardRef, useImperativeHandle, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { InputFormat } from "../../hooks/mutations/prompt/usePostPrompt";

export interface PropertyProps {
    option: InputFormat;
}

export interface PropertyRef {
    getValue: () => string;
}

const Property = forwardRef<PropertyRef, PropertyProps>(({ option }, ref) => {
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    return (
        <PropertyContainer>
            <Title>{option.name}</Title>

            {option.type === "text" && (
                <TextArea
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    placeholder={option.placeholder}
                />
            )}

            {/* <AInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            /> */}
        </PropertyContainer>
    );
});
export default Property;

const PropertyContainer = styled.div`
    margin: 30px 0;
`;

const Title = styled.h3`
    ${({ theme }) => theme.fonts.subtitle};

    margin: 5px 0;
`;
