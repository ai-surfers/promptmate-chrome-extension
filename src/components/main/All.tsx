import { Card, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/prompt/useGetPromptList";
import { useState } from "react";

export default function All() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const { data } = useGetPromptList({
        view_type: "open",
        page: page,
    });

    function onChange(page: number, pageSize: number) {
        setPage(page);
    }

    return (
        <AllContainer>
            {data?.data.prompt_info_list.map((pt) => (
                <Card
                    key={pt.id}
                    style={{ width: "100%" }}
                    onClick={() => navigate(`/prompt/${pt.id}`)}
                    extra={<a>사용하기</a>}
                    title={pt.title}
                >
                    <div style={{ fontWeight: "700" }}></div>

                    <div style={{ color: "#727272" }}>{pt.description}</div>
                </Card>
            ))}

            <Pagination
                total={data?.data.page_meta_data.total_count}
                pageSize={10}
                onChange={onChange}
                showSizeChanger={false}
            />
        </AllContainer>
    );
}

const AllContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;

    padding-bottom: 20px;
`;
