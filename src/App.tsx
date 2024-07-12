import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import Modal from "./components/common/modal/Modal";
import Alert from "./components/common/alert/Alert";
import {
    initOnRuntimeMessage,
    initOnWindowEventMessage,
} from "./service/chrome/messaging";

interface AppProps {
    isExt: boolean;
}
function App({ isExt }: AppProps) {
    initOnRuntimeMessage();
    initOnWindowEventMessage();

    return (
        <>
            <div>isExt - {isExt}</div>
            <RecoilRoot>
                <RouterProvider router={router} />
                <Modal />
                <Alert />
            </RecoilRoot>
        </>
    );
}

export default App;
