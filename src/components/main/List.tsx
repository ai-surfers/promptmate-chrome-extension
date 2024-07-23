import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/prompt/useGetPromptList";
import { useState } from "react";
import ListItem from "./ListItem";
import Search from "./Search";

interface ListProps {
    type: string;
}
export default function List({ type }: ListProps) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string | undefined>();
    const { data } = useGetPromptList({
        view_type: type,
        page: page,
        query: query,
        sort_by: "relevance",
    });

    // 페이지 변경 시,
    function handleOnChange(page: number, pageSize: number) {
        setPage(page);
    }

    // 검색어 입력 및 초기화 시,
    function handleOnEnter(value: string) {
        if (value === "") setQuery(undefined);
        else setQuery(value);
    }

    function handleOnClear() {
        setQuery(undefined);
    }

    return (
        <ListContainer>
            <Search onEnter={handleOnEnter} onClear={handleOnClear} />

            {data?.data.prompt_info_list.map((pt) => (
                <ListItem
                    key={pt.id}
                    prompt={pt}
                    onClick={() => navigate(`/prompt/${pt.id}`)}
                />
            ))}

            <Pagination
                total={data?.data.page_meta_data.total_count}
                pageSize={10}
                onChange={handleOnChange}
                showSizeChanger={false}
            />
        </ListContainer>
    );
}

const ListContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;

    padding-bottom: 20px;
`;
