import { useNavigate } from "react-router-dom";

export default function TemplatePage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="button" onClick={() => navigate(-1)}>
                Template
            </div>
        </>
    );
}
