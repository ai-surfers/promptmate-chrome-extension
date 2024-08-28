import Tutorial1 from "../../components/tutorial/tutorial1/Tutorial1";
import Tutorial2 from "../../components/tutorial/tutorial2/Tutorial2";
import Tutorial3 from "../../components/tutorial/tutorial3/Tutorial3";
import Tutorial4 from "../../components/tutorial/tutorial4/Tutorial4";
import Tutorial5 from "../../components/tutorial/tutorial5/Tutorial5";
import { useFunnel } from "../../hooks/useFunnel";

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
        <div>
            tutorial {currentStep} (Step {currentIndex + 1} of {steps.length})
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
        </div>
    );
}
