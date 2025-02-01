import { Button } from '@/components/ui/button';
import styles from '../tutorial.styles';
import pocketPromptSVG from '@/assets/svg/pocket-prompt.svg';

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

			<img src={pocketPromptSVG} />

			<styles.Wrapper>
				<styles.Content>
					포켓 프롬프트와 함께,
					<br />
					당신의 AI에 날개를 달아주세요!
				</styles.Content>

				<Button onClick={onNext} className="w-full">
					시작하기
				</Button>
			</styles.Wrapper>
		</styles.Container>
	);
}
