import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRef, useState } from "react";

import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import Property, { PropertyRef } from "../../components/prompt/Property";
import {
    getCurrentTabUrl,
    insertPromptToDOMInput,
    openUrlInNewTab,
} from "../../service/chrome/utils";

import { Button, Result, Spin } from "antd";
import TopBox from "../../components/prompt/TopBox";
import InfoDrawer from "../../components/prompt/InfoDrawer";
import { getAIPlatformType } from "../../utils";
import { useGetPrompt } from "../../hooks/queries/prompt/useGetPrompt";
import { useModal } from "../../hooks/useModal";
import AdContent, {
    AdFooter,
} from "../../components/common/modal/content/AdContent";
import {
    AdType,
    ExecutePrompt,
    usePostPromptExecute,
} from "../../hooks/mutations/prompt/usePostPromptExecute";
import { useQueryClient } from "@tanstack/react-query";
import { PROMPT_KEYS } from "../../hooks/queries/QueryKeys";
import NotSupportedModal from "../../components/common/modal/NotSupportedModal";
import ResultPrompt from "../../components/prompt/ResultPrompt";

export default function PromptPage() {
    const { id = "" } = useParams();
    const { openModal, closeModal } = useModal();

    const [showNotSupportedModal, setShowNotSupportedModal] = useState(false);
    const [prompt, setPrompt] = useState("");

    const [open, setOpen] = useState(false);
    const propertyRefs = useRef<Record<string, PropertyRef>>({});

    const queryClient = useQueryClient();
    const { data, isError, isLoading } = useGetPrompt(id);
    const { mutate } = usePostPromptExecute({
        onSuccess: (res) => {
            const { success, detail, data } = res;
            console.log(`>> `, success, detail);

            if (!success) {
                console.error("지원하지 않는 플랫폼입니다.");
                openUrlInNewTab("https://chatgpt.com/");
                setShowNotSupportedModal(true);
                setPrompt(data.full_prompt);
                return;
            }

            insertPromptToDOMInput(data.full_prompt);

            // 광고 있는 경우, 광고 팝업 노출
            if (data.ad) {
                handleAd(data.ad);
            }

            // 인풋 values 초기화
            for (const key in propertyRefs.current) {
                if (propertyRefs.current[key]) {
                    propertyRefs.current[key].setValue("");
                }
            }

            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

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
            const ai_platform = getAIPlatformType(url);

            const req: ExecutePrompt = {
                context: propertyValues,
                ai_platform: ai_platform,
            };

            mutate({ prompt_id: id, request: req });
        });
    }

    function handleAd(ad: AdType) {
        openModal({
            title: ad.ad_product_name,
            content: <AdContent ad={ad} />,
            footer: <AdFooter closeModal={closeModal} ad={ad} />,
        });
    }

    if (isLoading) {
        return (
            <>
                <Header title="프롬프트 사용하기" canGoBack={true} />
                <FullWrapper>
                    <Spin tip="Loading">
                        <div style={{ padding: 50 }} />
                    </Spin>
                </FullWrapper>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Header title="프롬프트 사용하기" canGoBack={true} />
                <FullWrapper>
                    <Result
                        status="warning"
                        title="There are some problems with your operation."
                    />
                </FullWrapper>
            </>
        );
    }

    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                {data?.data && (
                    <>
                        <TopBox
                            id={id}
                            isFavorite={data?.data.is_starred_by_user}
                            author={data.data.author_nickname}
                            onInformationClick={() => setOpen(true)}
                        />

                        <Title>{data?.data.title}</Title>
                        <Description>{data?.data.description}</Description>

                        {data?.data.user_input_format.map((opt) => (
                            <Property
                                key={opt.name}
                                option={opt}
                                ref={(el) => {
                                    if (el) propertyRefs.current[opt.name] = el;
                                }}
                            />
                        ))}

                        {prompt && <ResultPrompt prompt={prompt} />}

                        <Button
                            type="primary"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                marginBottom: "30px",
                            }}
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

            <NotSupportedModal
                isOpen={showNotSupportedModal}
                prompt={prompt}
                closeModal={() => setShowNotSupportedModal(false)}
            />
        </>
    );
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    margin: 10px 0;
`;

const Description = styled.h2`
    ${({ theme }) => theme.fonts.description};
    color: ${({ theme }) => theme.colors.deep_gray};
`;

const FullWrapper = styled.div`
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.mixins.flexBox()};
`;
