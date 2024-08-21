import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import Header from "../../components/common/header/AHeader";
import { Wrapper } from "../../layouts/Layout";
import PromptForm from "../../components/newPrompt/PromptForm";
import {
    CreatePromptRequest,
    usePostPrompt,
} from "../../hooks/mutations/prompt/usePostPrompt";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPrompt } from "../../hooks/queries/prompt/useGetPrompt";

export default function ModifyPromptPage() {
    const { id = "" } = useParams();

    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();
    const queryClient = useQueryClient();

    const { data } = useGetPrompt(id);

    const { mutate } = usePostPrompt({
        onSuccess: (res) => {
            const { data } = res;
            console.log(data);

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
        },
    });

    function savePrompt(promptData: CreatePromptRequest) {
        mutate(promptData);
    }

    return (
        <>
            <Header title="프롬프트 수정하기" canGoBack={true} />
            <Wrapper>
                {data?.data && (
                    <PromptForm onSubmit={savePrompt} initialData={data.data} />
                )}
            </Wrapper>
        </>
    );
}
