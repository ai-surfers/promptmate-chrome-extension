interface Tutorial2Props {
    onNext: () => void;
}
export default function Tutorial2({ onNext }: Tutorial2Props) {
    return <div onClick={onNext}>Tutorial2</div>;
}
