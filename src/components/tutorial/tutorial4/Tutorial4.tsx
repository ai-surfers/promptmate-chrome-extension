import styled from 'styled-components';
import styles from '../tutorial.styles';
import FakePrompt from './FakePrompt';
import Button from '../../common/button/Button';
import { populateTemplate } from '../../../utils';
import { insertPromptToDOMInput } from '../../../service/chrome/utils';
import dummies from '../dummies.json';
const data = dummies.data;

interface Tutorial4Props {
	onNext: () => void;
}
export default function Tutorial4({ onNext }: Tutorial4Props) {
	function handleUsePrompt() {
		const propertyValues: Record<string, string> = {};
		propertyValues['주제'] = '제주도 여행 꼭 가봐야 하는 필수코스 3가지';

		const full_prompt = populateTemplate(data.prompt_template, propertyValues);
		console.log('>> ', full_prompt);
		insertPromptToDOMInput(full_prompt);

		setTimeout(() => {
			onNext();
		}, 800);
	}

	return (
		<styles.Container2>
			<styles.Wrapper style={{ flex: 2 }}>
				<styles.Title>프롬프트 전송하기</styles.Title>
				<styles.Subtitle>
					사용하기 버튼을 누르면 AI 채팅창에 <br />
					프롬프트가 자동으로 전송돼요
				</styles.Subtitle>
			</styles.Wrapper>

			<Line />

			<PromptContainer style={{ flex: 8 }}>
				<FakePrompt onNext={onNext} />
			</PromptContainer>

			<Button title="사용" onClick={handleUsePrompt} />
		</styles.Container2>
	);
}

const PromptContainer = styled.div`
    overflow: scroll;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background: #efefef;
    margin: 20px 0;
`;
