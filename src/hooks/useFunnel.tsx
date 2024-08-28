// [Reference] https://velog.io/@hoonnn/%ED%8D%BC%EB%84%90%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A7%8E%EC%9D%80-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-Feat.-useFunnel-React-Hook-Form
import React, { ReactElement, ReactNode, useState } from "react";

export interface StepProps<T> {
    name: T;
    children: ReactNode;
}

export interface FunnelProps<T> {
    children: Array<ReactElement<StepProps<T>>>;
}

export const useFunnel = <T extends string>(
    steps: T[],
    initialStepIndex: number = 0
) => {
    const [currentIndex, setCurrentIndex] = useState(initialStepIndex);

    const Step = (props: StepProps<T>): ReactElement => {
        return <>{props.children}</>;
    };

    const Funnel = ({ children }: FunnelProps<T>) => {
        const targetStep = children.find(
            (childStep) => childStep.props.name === steps[currentIndex]
        );

        return <>{targetStep}</>;
    };
    const nextStep = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < steps.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    const previousStep = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    return {
        Funnel,
        Step,
        nextStep,
        previousStep,
        setStepIndex: setCurrentIndex,
        currentStep: steps[currentIndex],
        currentIndex,
    } as const;
};
