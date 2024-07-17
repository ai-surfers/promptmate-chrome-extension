import styled from "styled-components";
import { forwardRef, useImperativeHandle, useState } from "react";
import AInput from "../common/input/AInput";

export interface PropertyProps {
    title: string;
}

export interface PropertyRef {
    getValue: () => string;
}

const Property = forwardRef<PropertyRef, PropertyProps>(({ title }, ref) => {
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    return (
        <PropertyContainer>
            <Title>{title}</Title>
            <AInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
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
