import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/useGetPromptList";

export default function All() {
    const navigate = useNavigate();

    const { data } = useGetPromptList({ view_type: "open", page: 1 });

    return (
        <AllContainer>
            {data?.data.prompt_info_list.map((pt) => (
                <Card
                    style={{ width: "100%" }}
                    onClick={() => navigate(`/prompt/${pt.id}`)}
                    extra={<a>사용하기</a>}
                    title={pt.title}
                >
                    <div style={{ fontWeight: "700" }}></div>

                    <div style={{ color: "#727272" }}>{pt.description}</div>
                </Card>
            ))}
        </AllContainer>
    );
}

const AllContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;
`;
