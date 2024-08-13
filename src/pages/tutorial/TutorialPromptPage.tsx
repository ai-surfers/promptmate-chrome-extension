import styled from "styled-components";
import { useRef, useState } from "react";

import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import Property, { PropertyRef } from "../../components/prompt/Property";
import {
    getCurrentTabUrl,
    insertPromptToDOMInput,
} from "../../service/chrome/utils";

import { Button, Tour, TourProps } from "antd";
import { InfoBoxWrapper, InfoButton } from "../../components/prompt/TopBox";
import InfoDrawer from "../../components/prompt/InfoDrawer";
import { getAIPlatformType, populateTemplate } from "../../utils";
import { GetPromptResponse } from "../../hooks/queries/prompt/useGetPrompt";

import NotSupportedModal from "../../components/common/modal/NotSupportedModal";
import dummies from "./dummies.json";
import StarButton from "../../components/common/button/StarButton";
import { AIPlatformType } from "../../core/Prompt";

export default function TutorialPromptPage() {
    const [showNotSupportedModal, setShowNotSupportedModal] = useState(false);
    const [prompt, setPrompt] = useState("");

    const [open, setOpen] = useState(false);
    const propertyRefs = useRef<Record<string, PropertyRef>>({});

    const data = dummies.data as GetPromptResponse;
    const id = data.id;

    /** TOUR **/
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [isTour, setIsTour] = useState(true);
    const steps: TourProps["steps"] = [
        {
            title: "(1) 내용 작성하기",
            description: "프롬프트에 들어갈 내용을 작성해요",
            target: () => ref1.current!!,
            nextButtonProps: {
                onClick: function fillProperties() {
                    for (const option of data.user_input_format) {
                        const key = option.name;
                        const placeholder = option.placeholder.replace(
                            "ex. ",
                            ""
                        );
                        if (propertyRefs.current[key]) {
                            propertyRefs.current[key].setValue(placeholder);
                        }
                    }
                },
            },
        },
        {
            title: "(2) 프롬프트 사용하기",
            description: "버튼을 누르면 자동으로 입력 후 전송돼요",
            target: () => ref2.current,
        },
        {
            title: "(3) 즐겨찾기 등록하기",
            description: "프롬프트가 마음에 든다면 즐겨찾기를 눌러보세요!",
            target: () => ref3.current,
        },
    ];

    /** EXECUTE **/
    async function handleUsePrompt() {
        const propertyValues: Record<string, string> = {};

        for (const key in propertyRefs.current) {
            if (propertyRefs.current[key]) {
                propertyValues[key] = propertyRefs.current[key].getValue();
            }
        }

        const full_prompt = populateTemplate(
            data.prompt_template,
            propertyValues
        );
        console.log(full_prompt);

        getCurrentTabUrl((url) => {
            // 플랫폼 확인 (ChatGPT, Gemini, Claude)
            if (getAIPlatformType(url) === AIPlatformType.NONE) {
                console.error("지원하지 않는 플랫폼입니다.");
                setShowNotSupportedModal(true);
                setPrompt(full_prompt);
                return;
            }

            // Inject
            insertPromptToDOMInput(full_prompt);

            // Finish!
        });
    }

    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                {data && (
                    <>
                        <InfoBoxWrapper>
                            <span ref={ref3}>
                                <StarButton
                                    id={id}
                                    isFavorite={data.is_starred_by_user}
                                />
                            </span>
                            <InfoButton
                                onInformationClick={() => setOpen(true)}
                            />
                        </InfoBoxWrapper>

                        <Title>{data.title}</Title>
                        {/* <Description>{data.description}</Description> */}

                        <div ref={ref1}>
                            {data.user_input_format.map((opt) => (
                                <Property
                                    key={opt.name}
                                    option={opt}
                                    ref={(el) => {
                                        if (el)
                                            propertyRefs.current[opt.name] = el;
                                    }}
                                />
                            ))}
                        </div>

                        <Button
                            ref={ref2}
                            type="primary"
                            style={{ width: "100%", marginBottom: "30px" }}
                            onClick={handleUsePrompt}
                        >
                            사용
                        </Button>

                        <InfoDrawer
                            info={data}
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

            <Tour
                open={isTour}
                onClose={() => setIsTour(false)}
                steps={steps}
                zIndex={999}
            />
        </>
    );
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    margin: 10px 0;
`;

const Description = styled.h2`
    ${({ theme }) => theme.fonts.placeholder};
    text-align: center;
    margin: 10px 0 20px;

    color: ${({ theme }) => theme.colors.main_gray};
`;
