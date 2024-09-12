import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import AModal from "./components/common/modal/AModal";
import Alert from "./components/common/alert/Alert";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./service/queryClient";
import { useEffect } from "react";

function App() {
    console.log(process.env.REACT_APP_MODE);

    useEffect(() => {
        if (process.env.REACT_APP_MODE === "production") {
            console.log("* Clarity Added!");
            (function (c: any, l: Document, a: string, r: string, i: string) {
                c[a] =
                    c[a] ||
                    function () {
                        (c[a].q = c[a].q || []).push(arguments);
                    };
                const t = l.createElement(r) as HTMLScriptElement;
                t.async = true; // Use true instead of 1
                t.src = "https://www.clarity.ms/tag/YOUR_CLARITY_ID";
                const y = l.getElementsByTagName(r)[0];
                if (y && y.parentNode) {
                    y.parentNode.insertBefore(t, y);
                }
            })(window, document, "clarity", "script", "o1li83b01p");
        }
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
