interface Tutorial4Props {
    onNext: () => void;
}
export default function Tutorial4({ onNext }: Tutorial4Props) {
    return <div onClick={onNext}>Tutorial4</div>;
}
