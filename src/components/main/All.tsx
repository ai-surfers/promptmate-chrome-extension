import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function All() {
    const navigate = useNavigate();
    const id = "668dae55bf329460ccb9b1ff";

    return (
        <div>
            All
            <Box onClick={() => navigate(`/prompt/${id}`)}>{id}</Box>
        </div>
    );
}

const Box = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px 10px;
    border-radius: 10px;
    background: #efefef;
`;
