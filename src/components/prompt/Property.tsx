import styled from "styled-components";
import Input from "../common/input/Input";
import { forwardRef, useImperativeHandle, useState } from "react";

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
        <div>
            <Title>{title}</Title>
            <Input
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
});
export default Property;

const Title = styled.h3`
    ${({ theme }) => theme.fonts.h3};
    color: ${({ theme }) => theme.colors.main};

    margin: 5px 0;
`;
