export const Visibility: string[] = ["public", "private"];

interface Category {
    [key: string]: { ko: string; en: string };
}

export const Categories: Category = {
    branding: { ko: "브랜딩", en: "branding" },
    blog: { ko: "블로그", en: "blog" },
    business: { ko: "비즈니스", en: "business" },
    development: { ko: "개발", en: "development" },
    marketing: { ko: "마케팅", en: "marketing" },
    research: { ko: "리서치", en: "research" },
    writing: { ko: "글쓰기", en: "writing" },
    productivity: { ko: "생산성", en: "productivity" },
    language: { ko: "언어", en: "language" },
    entertainment: { ko: "재미", en: "entertainment" },
    video: { ko: "영상", en: "video" },
};

export enum InputType {
    TEXT = "text",
    LONGTEXT = "longtext",
    DROPDOWN = "dropdown",
    NUMBER = "number",
}

export type TypeOfInputType =
    | InputType.TEXT
    | InputType.LONGTEXT
    | InputType.NUMBER
    | InputType.DROPDOWN;

export enum AIPlatformType {
    CHATGPT = "ChatGPT",
    CLAUDE = "Claude",
    GEMINI = "Gemini",
}

export type TypeOfAIPlatformType =
    | AIPlatformType.CHATGPT
    | AIPlatformType.CLAUDE
    | AIPlatformType.GEMINI;
