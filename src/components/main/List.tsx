import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/prompt/useGetPromptList";
import { useState } from "react";
import ListItem from "./ListItem";

interface ListProps {
    type: string;
}
export default function List({ type }: ListProps) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const { data } = useGetPromptList({
        view_type: type,
        page: page,
    });

    function onChange(page: number, pageSize: number) {
        setPage(page);
    }

    return (
        <ListContainer>
            {data?.data.prompt_info_list.map((pt) => (
                <ListItem
                    prompt={pt}
                    onClick={() => navigate(`/prompt/${pt.id}`)}
                />
            ))}

            <Pagination
                total={data?.data.page_meta_data.total_count}
                pageSize={10}
                onChange={onChange}
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
