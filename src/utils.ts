import { AIPlatformType } from './core/Prompt';

/**
 * text에서 []로 묶어진 옵션들을 추출하는 함수
 * @param text
 * @returns []로 작성한 옵션들 (중복 X, \[\]는 무시)
 */
export function extractOptions(text: string): string[] {
	console.log('>> text', text);
	const regex = /(?<!\\)\[(.*?)]/g;
	let matches;

	const options = new Set<string>();
	while ((matches = regex.exec(text)) !== null) {
		options.add(matches[1]);
	}
	return Array.from(options);
}

// 240722 미사용 - 백에서 처리
/**
 * 입력받은 value들을 {{}} 영역에 replace한 텍스트를 리턴하는 함수
 * @param template
 * @param values
 * @returns replace한 텍스트
 */
export function populateTemplate(template: string, values: Record<string, string>): string {
	return template.replace(/\[(.*?)\]/g, (_, key) => values[key]);
}

/**
 * 현재 url에 해당하는 AI Platform Type을 리턴하는 함수
 * @param url
 * @returns 해당하는 AI Platform Type
 */
export function getAIPlatformType(url: string) {
	if (url.includes('chatgpt.com')) return AIPlatformType.CHATGPT;
	else if (url.includes('claude.ai')) return AIPlatformType.CLAUDE;
	else if (url.includes('gemini.google.com')) return AIPlatformType.GEMINI;
	else if (url.includes('perplexity.ai')) return AIPlatformType.PERPLEXITY;
	else return AIPlatformType.NONE; // "Not Supported Platform";
}

/**
 * 클립보드에 텍스트 복사하는 함수
 * @param text
 * @return Promise 함수
 */
export function copyClipboard(text: string) {
	return navigator.clipboard.writeText(text);
}

/**
 * 포켓 프롬프트 웹버전 URL 가져오는 함수
 * @param path
 */
export const getPocketPromptWebUrl = (path: string) => {
	const baseUrl = import.meta.env.VITE_WEB_URL;
	const url = `${baseUrl}/${path}`;
	return url;
};
