import styles from "../tutorial.styles";
import Button from "../../common/button/Button";

interface Tutorial5Props {
    onNext: () => void;
}
export default function Tutorial4({ onNext }: Tutorial5Props) {
    return (
        <styles.Container>
            <styles.Wrapper>
                <styles.Title>잘 하셨어요 👏 </styles.Title>
                <styles.Subtitle></styles.Subtitle>
            </styles.Wrapper>

            <img src="/images/img_hero.svg" alt="ic_back" />

            <styles.Wrapper>
                <styles.Content>
                    포켓 프롬프트와 함께,
                    <br />
                    당신의 AI에 날개를 달아주세요!
                </styles.Content>

                <Button title="시작하기" onClick={onNext} />
            </styles.Wrapper>
        </styles.Container>
    );
}
