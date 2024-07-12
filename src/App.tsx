// import { RouterProvider } from "react-router-dom";
// import router from "./router/Router";
// import { RecoilRoot } from "recoil";
// import Modal from "./components/common/modal/Modal";
// import Alert from "./components/common/alert/Alert";

// function App() {
//     return (
//         <>
//             <RecoilRoot>
//                 <RouterProvider router={router} />
//                 <Modal />
//                 <Alert />
//             </RecoilRoot>
//         </>
//     );
// }

interface AppProps {
    isExt: boolean;
}

const App = ({ isExt }: AppProps) => {
    return (
        <>
            <header className="App-header">
                {isExt ? <div>Chrome</div> : <div>No chrome</div>}
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </>
    );
};

export default App;
