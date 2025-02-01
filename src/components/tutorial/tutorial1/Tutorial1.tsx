import { Button } from '@/components/ui/button';
import styles from '../tutorial.styles';
import pocketPromptSVG from '@/assets/svg/pocket-prompt.svg';

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

			<img src={pocketPromptSVG} />

			<styles.Wrapper>
				<styles.Content>
					당신의 AI에 날개를 달아줄 최고의 프롬프트,
					<br />
					포켓 프롬프트에 오신 것을 환영합니다!
				</styles.Content>

				<Button onClick={onNext} className="w-full">
					다음
				</Button>
			</styles.Wrapper>
		</styles.Container>
	);
}
