import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface TextAreaProps {
	placeholder?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ placeholder, value, onChange }: TextAreaProps) {
	return <TextAreaBox value={value} placeholder={placeholder} onChange={onChange} />;
}

const TextAreaBox = styled.textarea`
    ${({ theme }) => theme.fonts.input};

    width: 100%;
    min-height: 120px;

    padding: 10px 20px;
    margin-bottom: 30px;

    color: ${({ theme }) => theme.colors.main};
    background: ${({ theme }) => theme.colors.light_gray};
    border-radius: 10px;

    &::placeholder {
        ${({ theme }) => theme.fonts.placeholder};
        color: ${({ theme }) => theme.colors.deep_gray};
    }
`;
