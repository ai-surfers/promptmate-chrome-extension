// export enum Visibility {
//     PUBLIC = "public",
//     PRIVATE = "private",
// }

// export type Visibility = "public" | "private";

export const Visibility: string[] = ["public", "private"];
export const Category: string[] = [
    "branding",
    "blog",
    "business",
    "development",
    "marketing",
    "research",
    "writing",
    "productivity",
    "language",
    "entertainment",
    "video",
];

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
