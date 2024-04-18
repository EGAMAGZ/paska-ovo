/** 
 * This module contains utility functions for converting key codes into character codes or special key names.
 * @module
*/
import { SPECIAL_KEYS } from "./constants.ts";


/**
 * Converts a string of comma-separated key codes into a string of corresponding character codes or special key names.
 *
 * @param {string} code - The string of comma-separated key codes to convert.
 * @return {string} The string of corresponding character codes or special key names.
 */
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

            return c;
        })
        .join(",");
}