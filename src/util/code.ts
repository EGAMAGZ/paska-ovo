import { SPECIAL_KEYS } from "./constants.ts";

export function codeToChars(code: string): string {
    return code
        .split(",")
        .map(c => c.trim().toLowerCase())
        .filter(c => c !== "")
        .map(c => {
            const parsed = parseInt(c);
            if (!isNaN(parsed)) {
                return parsed;
            }
            if (Object.keys(SPECIAL_KEYS).includes(c)) {
                return SPECIAL_KEYS[c];
            }

            return c.charCodeAt(0);
        })
        .join(",");
}