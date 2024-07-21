/**
 * text에서 {{}}로 묶어진 옵션들을 추출하는 함수
 * @param text
 * @returns {{}}로 작성한 옵션들
 */
export function extractOptions(text: string): string[] {
    console.log(">> text", text);
    const regex = /\{\{(.*?)\}\}/g;
    let matches;
    const options: string[] = [];
    while ((matches = regex.exec(text)) !== null) {
        options.push(matches[1]);
    }
    return options;
}

/**
 * 입력받은 value들을 $$ 영역에 replace한 텍스트를 리턴하는 함수
 * @param template
 * @param values
 * @returns replace한 텍스트
 */
// export function populateTemplate(
//     template: string,
//     values: Record<string, string>
// ): string {
//     return template.replace(/\$(.*?)\$/g, (_, key) => values[key]);
// }
// 240722 미사용 - 백에서 처리
