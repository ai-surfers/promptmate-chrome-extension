import { Input } from "antd";
import { ChangeEvent, MouseEvent, KeyboardEvent } from "react";

interface SearchProps {
    onEnter: (value: string) => void;
    onClear: () => void;
}

type OnSearchType = (
    value: string,
    event?:
        | ChangeEvent<HTMLInputElement>
        | MouseEvent<HTMLElement>
        | KeyboardEvent<HTMLInputElement>
        | undefined,
    info?: { source?: "input" | "clear" } | undefined
) => void;

export default function Search({ onEnter, onClear }: SearchProps) {
    const { Search } = Input;

    const handleOnSearch: OnSearchType = (value, event, info) => {
        if (info?.source === "input") {
            onEnter(value);
        } else if (info?.source === "clear") {
            onClear();
        }
    };

    return <Search allowClear onSearch={handleOnSearch} />;
}
