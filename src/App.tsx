import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import Modal from "./components/common/modal/Modal";
import Alert from "./components/common/alert/Alert";

function App() {
    return (
        <>
            <RecoilRoot>
                <RouterProvider router={router} />
                <Modal />
                <Alert />
            </RecoilRoot>
        </>
    );
}

export default App;
