interface Tutorial5Props {
    onNext: () => void;
}
export default function Tutorial4({ onNext }: Tutorial5Props) {
    return <div onClick={onNext}>Tutorial5</div>;
}
