/*global chrome*/
import ReactDOM from "react-dom";
import Frame from "react-frame-component";
import App from "../App";

const Main = () => (
    <Frame>
        <App isExt={true} />
    </Frame>
);

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "block";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
        toggle();
    }
});

function toggle() {
    if (app.style.display === "none") {
        app.style.display = "block";
    } else {
        app.style.display = "none";
    }
}
