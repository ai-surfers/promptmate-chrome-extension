import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import AModal from "./components/common/modal/AModal";
import Alert from "./components/common/alert/Alert";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./service/queryClient";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <RouterProvider router={router} />
                    <AModal />
                    <Alert />
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
}

export default App;
