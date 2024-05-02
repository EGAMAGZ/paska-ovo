/** 
 * @module
 * This module contains utility functions for converting key codes into character codes or special key names.
*/
import { SPECIAL_KEYS } from "../util/constants.ts";


/**
 * Converts a list of key codes into a list of string of corresponding character codes or special key names.
 *
 * @param {string[]} code - List of key codes.
 * @return {string[]} - List of corresponding character codes or special key names.
 */
export function codeToChars(code: string[]): string[] {
    return code
        .map(c => c.trim().toLowerCase())
        .filter(c => c !== "")
        .map(c => {
            if (Object.keys(SPECIAL_KEYS).includes(c)) {
                return SPECIAL_KEYS[c];
            }
            return c;
        });
}