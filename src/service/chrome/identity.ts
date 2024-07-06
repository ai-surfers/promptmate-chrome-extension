// chrome/identity.ts

export const getAuthToken = (callback: (token: string) => void) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
            chrome.tabs.create({
                url: "https://accounts.google.com/signin",
            });

            callback("");
            return;
        }
        console.log("signed in!", token);

        console.log(`🟠 [Chrome Identity] getAuthToken - ${token}`);
        callback(token);
    });
};
