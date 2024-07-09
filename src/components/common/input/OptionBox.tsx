import styled from "styled-components";

interface OptionBoxProps {
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
}

export default function OptionBox({
    value,
    options,
    onChange,
}: OptionBoxProps) {
    return (
        <OptionBoxContainer>
            {options.map((opt) => (
                <Option selected={value === opt} onClick={() => onChange(opt)}>
                    {opt}
                </Option>
            ))}
        </OptionBoxContainer>
    );
}

const OptionBoxContainer = styled.div`
    width: 100%;

    ${({ theme }) => theme.mixins.flexBox("row", "flex-start", "center")};
    flex-wrap: wrap;
    gap: 3px;
`;

const Option = styled.button<{ selected: boolean }>`
    ${({ theme }) => theme.fonts.option};

    border-radius: 40px;
    border: 1px solid #5d5a88;
    padding: 5px 20px;

    color: ${({ selected, theme }) =>
        selected ? theme.colors.white : theme.colors.main};
    background: ${({ selected, theme }) =>
        selected ? theme.colors.main : theme.colors.white};

    &:hover {
        background: ${({ theme }) => theme.colors.main_light};
        color: ${({ theme }) => theme.colors.white};
    }
`;
