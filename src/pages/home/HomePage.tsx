import { useNavigate } from "react-router-dom";
import Tab from "../../components/main/Tab";
import styled from "styled-components";

export default function HomePage() {
    const navigate = useNavigate();

    function onCurrentTabChanged(tab: string) {
        alert(tab);
    }
    return (
        <HomeContainer>
            <Tab
                onChange={onCurrentTabChanged}
                onAdd={() => navigate("/prompt")}
            />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
