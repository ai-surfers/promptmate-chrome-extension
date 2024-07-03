import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="button" onClick={() => navigate(-1)}>
                Home
            </div>
        </>
    );
}
