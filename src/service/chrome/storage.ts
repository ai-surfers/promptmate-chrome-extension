// chrome/storage.ts
// https://developer.chrome.com/docs/extensions/reference/api/storage

/**
 * Chrome Local Storage Getter
 * @param key
 * @param callback
 */
export const getFromStorage = (
    key: string,
    callback: (value: string) => void
) => {
    if (!chrome?.storage) return;
    chrome.storage.local.get([key], (result) => {
        const value = result[key];
        console.log(`🟢 [Chrome Storage] get - ${key}: ${value}`);
        callback(value);
    });
};

/**
 * Chrome Local Storage Setter
 * @param key
 * @param value
 * @param callback
 */
export const setToStorage = (
    key: string,
    value: string,
    callback?: () => void
) => {
    if (!chrome?.storage) return;
    chrome.storage.local.set({ [key]: value }, function () {
        console.log(`🟢 [Chrome Storage] set - ${key}: ${value}`);
        if (callback) callback();
    });
};

/**
 * Chrome Local Storage Remover
 * @param key
 * @param callback
 */
export const removeFromStorage = (key: string, callback?: () => void) => {
    if (!chrome?.storage) return;
    chrome.storage.local.remove(key, function () {
        console.log(`🟢 [Chrome Storage] remove - ${key}`);
        if (callback) callback();
    });
};

/**
 * Chrome Local Storage Clear
 * @param callback
 */
export const clearStorage = (callback?: () => void) => {
    if (!chrome?.storage) return;
    chrome.storage.local.clear(function () {
        console.log(`🟢 [Chrome Storage] clear`);
        if (callback) callback();
    });
};
