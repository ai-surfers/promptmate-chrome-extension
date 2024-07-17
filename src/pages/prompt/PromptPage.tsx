import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import { getPrompt } from "../../service/prompt/prompt";
import { GetPromptResponse } from "../../service/prompt/prompt.model";
import Property, { PropertyRef } from "../../components/prompt/Property";
import { extractOptions, populateTemplate } from "../../utils";
import { useAlert } from "../../hooks/useAlert";
import { insertPromptToDOMInput } from "../../service/chrome/utils";

import { Button } from "antd";
import TopBox from "../../components/prompt/TopBox";
import InfoDrawer from "../../components/prompt/InfoDrawer";

export default function PromptPage() {
    const { openAlert } = useAlert();

    const { id } = useParams();
    const [prompt, setPrompt] = useState<GetPromptResponse>();
    const propertyRefs = useRef<Record<string, PropertyRef>>({});

    const options = useMemo(() => {
        if (!prompt) return [];
        return extractOptions(prompt.prompt_template);
    }, [prompt]);

    useEffect(() => {
        if (!id) return;

        getPrompt(id)
            .then((res) => {
                const { success, data, detail } = res.data;

                if (!success) {
                    console.error(detail);
                    openAlert({ content: detail });
                }

                setPrompt(data);
            })
            .catch((e) => {
                console.error(e);
                openAlert({ content: `[${e.code}] ${e.message}` });
            });
    }, [id, openAlert]);

    function handleUsePrompt() {
        const propertyValues: Record<string, string> = {};

        for (const key in propertyRefs.current) {
            if (propertyRefs.current[key]) {
                propertyValues[key] = propertyRefs.current[key].getValue();
            }
        }

        if (prompt) {
            const populatedTemplate = populateTemplate(
                prompt.prompt_template,
                propertyValues
            );
            console.log("Populated Template: ", populatedTemplate);
            insertPromptToDOMInput(populatedTemplate);
        }
    }

    function handleFavorite() {}

    const [open, setOpen] = useState(false);
    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                <TopBox
                    isFavorite={true}
                    onFavoriteClick={handleFavorite}
                    onInformationClick={() => setOpen(true)}
                />

                {prompt && (
                    <>
                        <Title>{prompt.title}</Title>

                        {options.map((opt) => (
                            <Property
                                key={opt}
                                title={opt}
                                ref={(el) => {
                                    if (el) propertyRefs.current[opt] = el;
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
                            info={prompt}
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
