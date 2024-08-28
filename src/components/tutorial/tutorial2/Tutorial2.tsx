import { openUrlInNewTab } from "../../../service/chrome/utils";
import Button from "../../common/button/Button";
import styles from "../tutorial.styles";

interface Tutorial2Props {
    onNext: () => void;
}
export default function Tutorial2({ onNext }: Tutorial2Props) {
    function handleGoGPT() {
        // 이동 후,
        openUrlInNewTab("https://chatgpt.com/");
        setTimeout(() => {
            onNext();
        }, 800);
    }

    return (
        <styles.Container>
            <styles.Wrapper>
                <styles.Title>프롬프트 사용하기</styles.Title>
                <styles.Subtitle>
                    버튼을 눌러 chatGPT로 이동해 보세요
                </styles.Subtitle>
            </styles.Wrapper>

            <img src="/images/img_platform.svg" alt="ic_back" />

            <styles.Wrapper>
                <styles.Content>
                    포켓 프롬프트는 ChatGPT, Claude 등 <br />
                    다양한 AI 플랫폼을 지원합니다
                </styles.Content>

                <Button title="chatGPT로 이동" onClick={handleGoGPT} />
            </styles.Wrapper>
        </styles.Container>
    );
}
