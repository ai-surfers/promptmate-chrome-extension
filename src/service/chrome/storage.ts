// chrome/storage.ts

export const getAccessTokenFromStorage = (
    callback: (token: string) => void
) => {
    chrome.storage.local.get("access_token", function (result) {
        console.log("Value currently is " + result.access_token);
        callback(result.access_token);
    });
};

export const setAccessTokenInStorage = (
    accessToken: string,
    callback: () => void
) => {
    chrome.storage.local.set({ access_token: accessToken }, function () {
        console.log("Value is set to " + accessToken);
        callback();
    });
};
