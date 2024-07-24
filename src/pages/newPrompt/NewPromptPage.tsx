import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import PromptForm from "../../components/newPrompt/PromptForm";
import {
    CreatePromptRequest,
    usePostPrompt,
} from "../../hooks/mutations/prompt/usePostPrompt";
import { useQueryClient } from "@tanstack/react-query";

export default function NewPromptPage() {
    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();
    const queryClient = useQueryClient();

    const { mutate } = usePostPrompt({
        onSuccess: (res) => {
            const { success, detail, data } = res;
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

            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error(error);
            showErrorAlert(`${error.message}`);
        },
    });
    function savePrompt(promptData: CreatePromptRequest) {
        mutate(promptData);
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
