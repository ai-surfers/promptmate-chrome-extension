import { Empty, Pagination, Tour, TourProps } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/prompt/useGetPromptList";
import { useEffect, useMemo, useRef, useState } from "react";
import ListItem from "./ListItem";
import Search from "./Search";
import dummies from "../../pages/tutorial/dummies.json";
import { GetPromptResponse } from "../../hooks/queries/prompt/useGetPrompt";
import { useUser } from "../../hooks/useUser";

const tutorial = dummies.data as GetPromptResponse;

interface ListProps {
    type: string;
}
export default function List({ type }: ListProps) {
    const navigate = useNavigate();

    const { userData } = useUser();

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string | undefined>();
    const { data: promptListData } = useGetPromptList({
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

    // TODO
    const showTutorial = useMemo(
        () => userData?.user?.total_prompt_executions === 0,
        [userData]
    );

    const [isTour, setIsTour] = useState(false);
    const tutorialRef = useRef(null);
    const steps: TourProps["steps"] = [
        {
            title: "프롬프트 사용 튜토리얼",
            description: "해당 프롬프트를 클릭해 보세요",
            target: () => tutorialRef.current!!,
            nextButtonProps: {
                onClick: function navigateToTutorialPrompt() {
                    navigate("/prompt/tutorial");
                },
            },
        },
    ];

    useEffect(() => {
        if (promptListData && showTutorial) {
            setIsTour(true);
        }
    }, [promptListData, showTutorial]);

    return (
        <ListContainer>
            <Search onEnter={handleOnEnter} onClear={handleOnClear} />

            {!promptListData?.data.page_meta_data.total_count && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}

            {/* Tutorial */}
            {showTutorial && (
                <div ref={tutorialRef}>
                    <ListItem
                        key={"tutorial"}
                        prompt={tutorial}
                        onClick={() => navigate(`/prompt/tutorial`)}
                    />
                </div>
            )}

            {promptListData?.data.prompt_info_list.map((pt) => (
                <ListItem
                    key={pt.id}
                    prompt={pt}
                    onClick={() => navigate(`/prompt/${pt.id}`)}
                />
            ))}

            <Pagination
                total={promptListData?.data.page_meta_data.total_count}
                pageSize={10}
                onChange={handleOnChange}
                showSizeChanger={false}
            />

            {/* Tutorial Tour*/}
            <Tour
                open={isTour}
                onClose={() => setIsTour(false)}
                steps={steps}
                zIndex={999}
            />
        </ListContainer>
    );
}

const ListContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;

    padding-bottom: 20px;
`;
