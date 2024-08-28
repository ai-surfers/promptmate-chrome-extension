import { Steps } from "antd";
import Tutorial1 from "../../components/tutorial/tutorial1/Tutorial1";
import Tutorial2 from "../../components/tutorial/tutorial2/Tutorial2";
import Tutorial3 from "../../components/tutorial/tutorial3/Tutorial3";
import Tutorial4 from "../../components/tutorial/tutorial4/Tutorial4";
import Tutorial5 from "../../components/tutorial/tutorial5/Tutorial5";
import { useFunnel } from "../../hooks/useFunnel";
import styled from "styled-components";

enum TUTORIAL_STEPS {
    INTRO = "intro",
    PLATFORM = "platform",
    INPUT = "input",
    EXECUTE = "execute",
    FINISH = "finish",
}
type TUTORIAL_STEP_VALUES =
    (typeof TUTORIAL_STEPS)[keyof typeof TUTORIAL_STEPS];
const steps = Object.values(TUTORIAL_STEPS);

export default function TutorialPage() {
    const { Funnel, Step, nextStep, currentStep, currentIndex } =
        useFunnel<TUTORIAL_STEP_VALUES>(steps, 0);

    return (
        <TutorialContainer>
            <DotConatiner>
                {steps.map((step, idx) => (
                    <Dot $active={step === currentStep} key={idx} />
                ))}

                <SkipButton>skip</SkipButton>
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
                        <Tutorial5 onNext={nextStep} />
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
    background: ${({ theme, $active }) => ($active ? "#4FB8E7" : "#e1e2e1")};
`;

const TutorialContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-start")};

    width: 100%;
    height: 100%;

    position: relative;
`;
