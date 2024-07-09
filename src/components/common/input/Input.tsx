import styled from "styled-components";
import { ChangeEvent } from "react";

interface InputProps {
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
    return (
        <InputBox placeholder={placeholder} value={value} onChange={onChange} />
    );
}

const InputBox = styled.input`
    ${({ theme }) => theme.fonts.input};
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 30px;

    color: ${({ theme }) => theme.colors.main};
    background: ${({ theme }) => theme.colors.light_gray};
    border-radius: 50px;

    &::placeholder {
        ${({ theme }) => theme.fonts.placeholder};
        color: ${({ theme }) => theme.colors.deep_gray};
    }
`;
