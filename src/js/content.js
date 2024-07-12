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

/**
 * 메시지 전송 (chrome, window)
 */
function sendRuntimeMessage(message, data = {}, callback) {
    console.log(`[content.js] sendRuntimeMessage ! \n`, message, data);
    chrome.runtime.sendMessage({ message: message, data: data }, callback);
}

function sendWindowMessage(message, data = {}) {
    console.log(`[content.js] sendWindowMessage \n `, message, data);
    window.parent.postMessage(
        {
            message: message,
            data: data,
        },
        "*"
    );
}

/**
 * 메시지 수신 (chrome, window)
 */

window.addEventListener("message", onEventMessage);
function onEventMessage(event) {
    const { message, data } = event.data;
    console.log(`[content.js] onEventMessage `, message, data);
}

chrome.runtime.onMessage.addListener(onRuntimeMessage);
function onRuntimeMessage(request, sender, sendResponse) {
    console.log("[content.js] onRuntimeMessage", sender, request);
    if (request.message === "clicked_browser_action") {
        toggle();
    }
}

/**
 * Funtions
 */
function toggle() {
    sendRuntimeMessage("chrometoggle", { display: app.style.display });

    if (app.style.display === "none") {
        app.style.display = "block";
    } else {
        app.style.display = "none";
    }
}
