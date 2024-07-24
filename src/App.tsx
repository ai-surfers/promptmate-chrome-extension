import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import Modal from "./components/common/modal/Modal";
import Alert from "./components/common/alert/Alert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <RouterProvider router={router} />
                    <Modal />
                    <Alert />
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
}

export default App;
