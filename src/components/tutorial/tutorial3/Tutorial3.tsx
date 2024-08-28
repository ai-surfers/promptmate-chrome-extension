interface Tutorial3Props {
    onNext: () => void;
}
export default function Tutorial3({ onNext }: Tutorial3Props) {
    return <div onClick={onNext}>Tutorial3</div>;
}
