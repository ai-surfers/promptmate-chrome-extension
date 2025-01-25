// chrome/storage.ts
// https://developer.chrome.com/docs/extensions/reference/api/storage

const isLocalDevelopment = !chrome?.storage;

/**
 * Local/Chrome Storage Getter
 * @param key
 * @param callback
 */
export const getFromStorage = (key: string, callback: (value: string) => void) => {
	if (isLocalDevelopment) {
		const value = localStorage.getItem(key);
		console.log(`🟡 [Local Storage] get - ${key}: ${value}`);
		callback(value || '');
	} else {
		chrome.storage.local.get([key], (result: Record<string, string>) => {
			const value = result[key];
			console.log(`🟢 [Chrome Storage] get - ${key}: ${value}`);
			callback(value);
		});
	}
};

/**
 * Local/Chrome Storage Setter
 * @param key
 * @param value
 * @param callback
 */
export const setToStorage = (key: string, value: string, callback?: () => void) => {
	if (isLocalDevelopment) {
		localStorage.setItem(key, value);
		console.log(`🟡 [Local Storage] set - ${key}: ${value}`);
		if (callback) callback();
	} else {
		chrome.storage.local.set({ [key]: value }, function () {
			console.log(`🟢 [Chrome Storage] set - ${key}: ${value}`);
			if (callback) callback();
		});
	}
};

/**
 * Local/Chrome Storage Remover
 * @param key
 * @param callback
 */
export const removeFromStorage = (key: string, callback?: () => void) => {
	if (isLocalDevelopment) {
		localStorage.removeItem(key);
		console.log(`🟡 [Local Storage] remove - ${key}`);
		if (callback) callback();
	} else {
		chrome.storage.local.remove(key, function () {
			console.log(`🟢 [Chrome Storage] remove - ${key}`);
			if (callback) callback();
		});
	}
};

/**
 * Local/Chrome Storage Clear
 * @param callback
 */
export const clearStorage = (callback?: () => void) => {
	if (isLocalDevelopment) {
		localStorage.clear();
		console.log(`🟡 [Local Storage] clear`);
		if (callback) callback();
	} else {
		chrome.storage.local.clear(function () {
			console.log(`🟢 [Chrome Storage] clear`);
			if (callback) callback();
		});
	}
};
