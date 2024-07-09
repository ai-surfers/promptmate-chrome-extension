import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/button/Button";
import Input from "../../components/common/input/Input";
import { useState } from "react";
import TextArea from "../../components/common/input/TextArea";
import { createPrompt } from "../../service/prompt/prompt";
import { PromptRequest } from "../../service/prompt/prompt.model";
import { Category, Visibility } from "../../core/Prompt";
import { useAlert } from "../../hooks/useAlert";
import SelectBox from "../../components/common/input/SelectBox";
import OptionBox from "../../components/common/input/OptionBox";

export default function PromptPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(Category[0]);
    const [visibility, setVisibility] = useState(Visibility[0]);

    const [prompt, setPrompt] = useState("");

    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();

    function savePrompt() {
        if (!title || !description || !category || !prompt) {
            showErrorAlert("필수 입력 사항을 \n모두 입력해주세요.");
            return;
        }

        const promptData: PromptRequest = {
            title: title,
            description: description,
            visibility: visibility,
            category: category,
            prompt_template: prompt,
        };

        createPrompt(promptData)
            .then((res) => {
                const { success, detail, data } = res.data;

                if (!success) {
                    console.error(`${detail}`);
                    showErrorAlert(detail);
                    return;
                }

                // 성공 시, 홈화면으로 이동
                openAlert({
                    content: `${data.id}가 등록되었습니다`,
                    callback: () => {
                        navigate("/home");
                        closeAlert();
                    },
                });
            })
            .catch((error) => {
                console.error(error);
                showErrorAlert(`[${error.code}] ${error.message}`);
            });
    }

    function showErrorAlert(msg: string) {
        openAlert({
            content: msg,
            callback: closeAlert,
        });
    }

    return (
        <>
            <SubTitle>제목</SubTitle>
            <Input
                value={title}
                placeholder="마케팅 카피라이트 만들기"
                onChange={(e) => setTitle(e.target.value)}
            />

            <SubTitle>설명</SubTitle>
            <Input
                value={description}
                placeholder="마케팅 카피라이팅을 만드는 프롬프트"
                onChange={(e) => setDescription(e.target.value)}
            />

            <OptionContainer>
                <Option>
                    <SubTitle>공개 범위</SubTitle>
                    <OptionBox
                        value={visibility}
                        options={Visibility}
                        onChange={(vis) => setVisibility(vis)}
                    />
                </Option>
                <Option>
                    <SubTitle>분야</SubTitle>
                    <SelectBox
                        selected={category}
                        options={Category}
                        onChange={(cat) => setCategory(cat)}
                    />
                </Option>
            </OptionContainer>

            <SubTitle>프롬프트</SubTitle>
            <TextArea
                value={prompt}
                placeholder={`너는 마케팅 전문가야. $상품 이름$에 대한 마케팅 카피라이팅을 만들어줘. 예상 청중은 $예상 청중$이고 상품의 특징은 $상품 특징$.

이들의 마음을 사로잡을 수 있는 매력적이고 센스있는 카피라이팅을 각기 다른 컨셉으로 총 3개 만들어줘`}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <Button title="추가" onClick={savePrompt} />
        </>
    );
}

const SubTitle = styled.h3`
    ${({ theme }) => theme.fonts.h3};
    color: ${({ theme }) => theme.colors.main};

    margin: 5px 0;
`;

const OptionContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start", "center")};
    margin-bottom: 30px;
`;

const Option = styled.div`
    flex: 1;
`;
