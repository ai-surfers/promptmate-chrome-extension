// [Reference] https://yogjin.tistory.com/121

const PROMPT_KEYS = {
    all: ["prompts"] as const,

    lists: () => [...PROMPT_KEYS.all, "list"] as const, // ["prompts", "list"]
    list: (filters: object) => [...PROMPT_KEYS.lists(), { filters }] as const, // ["prompts", "list", "..."]

    details: () => [...PROMPT_KEYS.all, "detail"] as const, // ["prompts", "detail"]
    detail: (id: string) => [...PROMPT_KEYS.details(), id] as const, // ["prompts", "detail", "id"]
};

const USER_KEYS = ["user"];

export { PROMPT_KEYS, USER_KEYS };
