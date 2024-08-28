import { Button, Empty, Pagination, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetPromptList } from "../../hooks/queries/prompt/useGetPromptList";
import { useMemo, useState } from "react";
import ListItem from "./ListItem";
import Search from "./Search";
// import dummies from "../../pages/tutorial/dummies.json";
// import { GetPromptResponse } from "../../hooks/queries/prompt/useGetPrompt";
// import { useUser } from "../../hooks/useUser";
import SortSelectBox from "../prompt/SortSelectBox";
import FilterSelectBox from "../prompt/FilterSelectBox";
import { SortBy } from "../../core/Prompt";
import { SmileTwoTone } from "@ant-design/icons";

// const tutorial = dummies.data as GetPromptResponse;

interface ListProps {
    type: string;
    onChangeTab?: (tab: string) => void;
}
export default function List({ type, onChangeTab }: ListProps) {
    const navigate = useNavigate();

    // const { userData } = useUser();

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<string>(Object.keys(SortBy)[0]);
    const [categories, setCategories] = useState<string>();
    const { data: promptListData } = useGetPromptList({
        view_type: type,
        page: page,
        query: query,
        sort_by: sortBy,
        categories: categories,
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
    // const showTutorial = useMemo(
    //     () => userData?.user?.total_prompt_executions === 0,
    //     [userData]
    // );

    // const [isTour, setIsTour] = useState(showTutorial);
    // const tutorialRef = useRef(null);
    // const steps: TourProps["steps"] = [
    //     {
    //         title: "프롬프트 사용 튜토리얼",
    //         description: "해당 프롬프트를 클릭해 보세요",
    //         target: () => tutorialRef.current!!,
    //         nextButtonProps: {
    //             onClick: function navigateToTutorialPrompt() {
    //                 navigate("/prompt/tutorial");
    //             },
    //         },
    //     },
    // ];

    // if (showTutorial) {
    //     return (
    //         <ListContainer>
    //             <Search onEnter={handleOnEnter} onClear={handleOnClear} />

    //             <FilterContainer>
    //                 <SortSelectBox
    //                     onSelect={(value) => {
    //                         setSortBy(value);
    //                     }}
    //                 />
    //             </FilterContainer>

    //             {/* Tutorial */}
    //             {showTutorial && (
    //                 <div ref={tutorialRef}>
    //                     <ListItem
    //                         key={"tutorial"}
    //                         prompt={tutorial}
    //                         onClick={() => navigate(`/prompt/tutorial`)}
    //                     />
    //                 </div>
    //             )}

    //             {/* Tutorial Tour*/}
    //             <Tour
    //                 open={isTour}
    //                 onClose={() => setIsTour(false)}
    //                 steps={steps}
    //                 zIndex={999}
    //             />
    //         </ListContainer>
    //     );
    // }`

    const EmptyResult = useMemo(() => {
        const handleOnChangeTab = () => {
            if (onChangeTab) onChangeTab("open");
        };

        if (type === "starred")
            return (
                <Result
                    icon={<SmileTwoTone />}
                    subTitle="즐겨찾는 프롬프트를 추가해 시간을 절약하세요"
                    extra={
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={handleOnChangeTab}
                        >
                            프롬프트 둘러보러 가기
                        </Button>
                    }
                />
            );

        return <Result icon={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />} />;
    }, [type, onChangeTab]);

    return (
        <ListContainer>
            <Search onEnter={handleOnEnter} onClear={handleOnClear} />
            <FilterContainer>
                <FilterSelectBox onChange={(values) => setCategories(values)} />
                <SortSelectBox
                    onSelect={(value) => {
                        setSortBy(value);
                    }}
                />
            </FilterContainer>

            {!promptListData?.data.page_meta_data.total_count && (
                <>{EmptyResult}</>
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
        </ListContainer>
    );
}

const ListContainer = styled.div`
    flex: 1;
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 10px;

    padding-bottom: 20px;
`;

const FilterContainer = styled.div`
    width: 100%;
    ${({ theme }) => theme.mixins.flexBox("row", "flex-end", "flex-end")};
    gap: 10px;
`;
