import Tutorial1 from '../../components/tutorial/tutorial1/Tutorial1';
import Tutorial2 from '../../components/tutorial/tutorial2/Tutorial2';
import Tutorial3 from '../../components/tutorial/tutorial3/Tutorial3';
import Tutorial4 from '../../components/tutorial/tutorial4/Tutorial4';
import Tutorial5 from '../../components/tutorial/tutorial5/Tutorial5';
import { useFunnel } from '../../hooks/useFunnel';
import styled from 'styled-components';
import { setToStorage } from '../../service/chrome/storage';
import { ONBOARING } from '../../service/chrome/storage.keys';
import { useNavigate } from 'react-router-dom';

enum TUTORIAL_STEPS {
	INTRO = 'intro',
	PLATFORM = 'platform',
	INPUT = 'input',
	EXECUTE = 'execute',
	FINISH = 'finish',
}
type TUTORIAL_STEP_VALUES = (typeof TUTORIAL_STEPS)[keyof typeof TUTORIAL_STEPS];
const steps = Object.values(TUTORIAL_STEPS);

export default function TutorialPage() {
	const { Funnel, Step, nextStep, currentStep, currentIndex, setStepIndex } =
		useFunnel<TUTORIAL_STEP_VALUES>(steps, 0);

	const navigate = useNavigate();
	function onFinish() {
		// 스토리지 저장 후, 로그인 화면으로 이동
		setToStorage(ONBOARING, 'true', () => {
			navigate('/', { replace: true });
		});
	}

	return (
		<TutorialContainer>
			<DotConatiner>
				{steps.map((step, idx) => (
					<Dot $active={step === currentStep} key={idx} onClick={() => setStepIndex(idx)} />
				))}

				{currentStep !== TUTORIAL_STEPS.FINISH && <SkipButton onClick={onFinish}>skip</SkipButton>}
			</DotConatiner>

			<ContentContainer>
				<Funnel>
					<Step name={TUTORIAL_STEPS.INTRO}>
						<Tutorial1 onNext={nextStep} />
					</Step>
					<Step name={TUTORIAL_STEPS.PLATFORM}>
						<Tutorial2 onNext={nextStep} />
					</Step>
					<Step name={TUTORIAL_STEPS.INPUT}>
						<Tutorial3 onNext={nextStep} />
					</Step>
					<Step name={TUTORIAL_STEPS.EXECUTE}>
						<Tutorial4 onNext={nextStep} />
					</Step>
					<Step name={TUTORIAL_STEPS.FINISH}>
						<Tutorial5 onNext={onFinish} />
					</Step>
				</Funnel>
			</ContentContainer>
		</TutorialContainer>
	);
}

const DotConatiner = styled.div`
    flex: 1;
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 8px;

    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    height: 80px;
`;

const SkipButton = styled.div`
    position: absolute;
    top: 50%;
    right: 20px;

    transform: translateY(-50%);
    cursor: pointer;
`;

const ContentContainer = styled.div`
    width: 100%;
    padding: 30px 40px;
    height: calc(100% - 80px);
    margin-top: 80px;
`;

const Dot = styled.div<{ $active?: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: ${({ theme, $active }) => ($active ? '#7580EA' : '#DEE0E8')};
`;

const TutorialContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox('column', 'flex-start')};

    width: 100%;
    height: 100%;

    position: relative;
`;
