import { useNavigate } from "react-router-dom";
import { createPrompt } from "../../service/prompt/prompt";
import { CreatePromptRequest } from "../../service/prompt/prompt.model";
import { useAlert } from "../../hooks/useAlert";
import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import PromptForm from "../../components/newPrompt/PromptForm";

export default function NewPromptPage() {
    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();

    function savePrompt(promptData: CreatePromptRequest) {
        console.log(">> ", savePrompt);

        createPrompt(promptData)
            .then((res) => {
                const { success, detail, data } = res.data;
                console.log(data);

                if (!success) {
                    console.error(`${detail}`);
                    showErrorAlert(detail);
                    return;
                }

                // 성공 시, 홈화면으로 이동
                openAlert({
                    content: `${data.prompt_id}가 등록되었습니다`,
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
            <Header title="프롬프트 추가하기" canGoBack={true} />
            <Wrapper>
                <PromptForm onSubmit={savePrompt} />
            </Wrapper>
        </>
    );
}
