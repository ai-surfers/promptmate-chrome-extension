import Button from '../../common/button/Button';
import styles from '../tutorial.styles';

interface Tutorial1Props {
	onNext: () => void;
}
export default function Tutorial1({ onNext }: Tutorial1Props) {
	return (
		<styles.Container>
			<styles.Wrapper>
				<styles.Title>반가워요! 👋</styles.Title>
				<styles.Subtitle>프롬프트 작성, 더이상 고민하지 마세요</styles.Subtitle>
			</styles.Wrapper>

			<img src="/images/img_pocketprompt.svg" alt="ic_back" />

			<styles.Wrapper>
				<styles.Content>
					당신의 AI에 날개를 달아줄 최고의 프롬프트,
					<br />
					포켓 프롬프트에 오신 것을 환영합니다!
				</styles.Content>

				<Button title="다음" onClick={onNext} />
			</styles.Wrapper>
		</styles.Container>
	);
}
