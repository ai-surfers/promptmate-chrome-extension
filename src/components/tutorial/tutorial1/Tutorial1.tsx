interface Tutorial1Props {
    onNext: () => void;
}
export default function Tutorial1({ onNext }: Tutorial1Props) {
    return <div onClick={onNext}>Tutorial1</div>;
}
