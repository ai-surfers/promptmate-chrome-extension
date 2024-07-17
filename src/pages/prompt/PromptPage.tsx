import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/button/Button";
import { useEffect, useMemo, useRef, useState } from "react";

import Header from "../../components/common/header/Header";
import { Wrapper } from "../../layouts/Layout";
import { getPrompt } from "../../service/prompt/prompt";
import { GetPromptResponse } from "../../service/prompt/prompt.model";
import Property, { PropertyRef } from "../../components/prompt/Property";
import { extractOptions, populateTemplate } from "../../utils";
import { useAlert } from "../../hooks/useAlert";
import { insertPromptToDOMInput } from "../../service/chrome/utils";

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

    return (
        <>
            <Header title="프롬프트 사용하기" canGoBack={true} />
            <Wrapper>
                {prompt && (
                    <>
                        <Title>{prompt.title}</Title>
                        <div>
                            ⭐️ {prompt.star} / 🔗 {prompt.usages}
                        </div>

                        {options.map((opt) => (
                            <Property
                                key={opt}
                                title={opt}
                                ref={(el) => {
                                    if (el) propertyRefs.current[opt] = el;
                                }}
                            />
                        ))}
                    </>
                )}
                <Button title="사용" onClick={handleUsePrompt} />
            </Wrapper>
        </>
    );
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.main_light};
    margin: 10px 0 20px;
`;
