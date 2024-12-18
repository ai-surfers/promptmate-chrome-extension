import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import AModal from "./components/common/modal/AModal";
import Alert from "./components/common/alert/Alert";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./service/queryClient";
import { useEffect } from "react";
import { initializeGA } from "./utils/ga";

const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function App() {
    console.log(`🍀 ENVIRONMENT: ${import.meta.env.VITE_MODE}`);

    useEffect(() => {
        TRACKING_ID && initializeGA(TRACKING_ID);
    }, []);

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
