import styled from "styled-components";

interface SelectBoxProps {
    selected: string | undefined;
    options: readonly string[];
    onChange: (value: string) => void;
}

export default function SelectBox({
    selected,
    options,
    onChange,
}: SelectBoxProps) {
    return (
        <SelectBoxContainer>
            <Select
                name="choice"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option value={opt}>{opt}</option>
                ))}
            </Select>
        </SelectBoxContainer>
    );
}

const SelectBoxContainer = styled.div`
    width: 100%;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 5px 10px;
`;

const Select = styled.select`
    ${({ theme }) => theme.fonts.select};

    width: 100%;
    height: 100%;
    border: none;
`;
