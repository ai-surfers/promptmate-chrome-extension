import { useNavigate } from "react-router-dom";

export default function PromptPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="button" onClick={() => navigate(-1)}>
                Prompt
            </div>
        </>
    );
}
