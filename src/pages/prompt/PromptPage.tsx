import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRef, useState } from "react";

import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import { executePrompt } from "../../service/prompt/prompt";
import { ExecutePromptRequest } from "../../service/prompt/prompt.model";
import Property, { PropertyRef } from "../../components/prompt/Property";
import { useAlert } from "../../hooks/useAlert";
import {
    getCurrentTabUrl,
    insertPromptToDOMInput,
} from "../../service/chrome/utils";

import { Button } from "antd";
import TopBox from "../../components/prompt/TopBox";
import InfoDrawer from "../../components/prompt/InfoDrawer";
import { getAIPlatformType } from "../../utils";
import {
    PROMPT_QUERY_KEY,
    useGetPrompt,
} from "../../hooks/queries/prompt/useGetPrompt";
import { useQueryClient } from "@tanstack/react-query";
import { usePostStar } from "../../hooks/mutations/star/usePostStar";
import { useDeleteStar } from "../../hooks/mutations/star/useDeleteStar";

export default function PromptPage() {
    const { id = "" } = useParams();
    const { openAlert } = useAlert();

    const propertyRefs = useRef<Record<string, PropertyRef>>({});

    const queryClient = useQueryClient();
    const { data, isError, isLoading } = useGetPrompt(id);

    async function handleUsePrompt() {
        const propertyValues: Record<string, string> = {};

        for (const key in propertyRefs.current) {
            if (propertyRefs.current[key]) {
                propertyValues[key] = propertyRefs.current[key].getValue();
            }
        }

        if (!id) {
            console.error("Id가 없습니다.");
            return;
        }

        getCurrentTabUrl((url) => {
            const req: ExecutePromptRequest = {
                context: propertyValues,
                ai_platform: getAIPlatformType(url),
            };

            executePrompt(id, req)
                .then((res) => {
                    const { success, data, detail } = res.data;

                    if (!success) {
                        console.error(detail);
                        openAlert({ content: detail });
                    }

                    insertPromptToDOMInput(data.full_prompt);
                })
                .catch((e) => {
                    console.error(e);
                    openAlert({ content: `[${e.code}] ${e.message}` });
                });
        });
    }

    const { mutate: postStar } = usePostStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                openAlert({ content: detail });
                return;
            }

            queryClient.invalidateQueries({ queryKey: [PROMPT_QUERY_KEY] });
        },
        onError: (error) => {
            console.error("✈ /api/store ERROR >>", error);
        },
    });

    const { mutate: deleteStar } = useDeleteStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                openAlert({ content: detail });
                return;
            }

            queryClient.invalidateQueries({ queryKey: [PROMPT_QUERY_KEY] });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    function handleFavorite(isFavorite: boolean) {
        if (!id) {
            console.error("No id");
            return;
        }

        if (isFavorite) deleteStar(id);
        else postStar(id);
    }

    const [open, setOpen] = useState(false);
    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                {isError && <> error! </>}
                {isLoading && <> loading! </>}

                {data?.data && (
                    <>
                        <TopBox
                            isFavorite={data?.data.is_starred_by_user}
                            onFavoriteClick={handleFavorite}
                            onInformationClick={() => setOpen(true)}
                        />

                        <Title>{data?.data.title}</Title>

                        {data?.data.user_input_format.map((opt) => (
                            <Property
                                key={opt.name}
                                title={opt.name}
                                ref={(el) => {
                                    if (el) propertyRefs.current[opt.name] = el;
                                }}
                            />
                        ))}

                        <Button
                            type="primary"
                            style={{ width: "100%", marginTop: "50px" }}
                            onClick={handleUsePrompt}
                        >
                            사용
                        </Button>

                        <InfoDrawer
                            info={data.data}
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        />
                    </>
                )}
            </Wrapper>
        </>
    );
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    margin: 10px 0 20px;
`;
