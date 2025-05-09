/**
 * @module
 *
 * This module contains utility functions for converting key codes into character codes or special key names.
 */

/**
 *  A map of special key names to their corresponding standardized key codes.
 *  This is a constant record type to ensure immutability.
 */
export const SPECIAL_KEYS: Record<string, string> = {
  "slash": "/",
  "up": "ArrowUp",
  "down": "ArrowDown",
  "left": "ArrowLeft",
  "right": "ArrowRight",
  "enter": "Enter",
  "space": "Space",
  "ctrl": "Control",
  "alt": "Alt",
  "tab": "Tab",
  "esc": "Escape",
} as const;

export const SWIPE_DIRECTIONS = ["up", "down", "right", "left"];

/**
 * Validates and cleans an array of key codes for an easter egg.
 *
 * @param {string[]} code - Array of key codes to validate
 * @param {string} tag - Identifier for the easter egg being validated
 * @returns {string[]} Cleaned and validated array of key codes
 * @throws {Error} If the codes array is empty after cleaning
 * @throws {Error} If any code contains invalid characters
 */
export function validateKeyboardCode(code: string[], tag: string): string[] {
  const cleanedCodes = code
    .map((c) => c.trim().toLowerCase())
    .filter((c) => c !== "");

  if (cleanedCodes.length < 1) {
    throw new Error(
      `Error executing easter egg ${tag}: The code for the easter egg must contain at least one non-empty character.`,
    );
  }

  if (
    cleanedCodes.some((c) => {
      // Check if it's a special key
      if (Object.keys(SPECIAL_KEYS).includes(c)) {
        return false; // It's a valid special key
      }

      // If not a special key, it must be a single alphanumeric character
      return c.length !== 1 || !/[a-z0-9]/i.test(c);
    })
  ) {
    throw new Error(
      `Error executing easter egg ${tag}: The code for the easter egg must contain only valid key codes.`,
    );
  }

  return cleanedCodes;
}

/**
 * Validates and cleans an array of swipe codes for an easter egg.
 *
 * @param {string[]} code - Array of swipe codes to validate
 * @param {string} tag - Identifier for the easter egg being validated
 * @returns {string[]} Cleaned and validated array of key codes
 * @throws {Error} If the codes array is empty after cleaning
 * @throws {Error} If any code contains invalid swipe directions
 */
export function validateSwipeCode(code: string[], tag: string): string[] {
  const cleanedCodes = code
    .map((c) => c.trim().toLowerCase())
    .filter((c) => c !== "");

  if (cleanedCodes.length < 1) {
    throw new Error(
      `Error executing easter egg ${tag}: The code for the easter egg must contain at least one non-empty character.`,
    );
  }

  if (cleanedCodes.some((c) => !SWIPE_DIRECTIONS.includes(c))) {
    throw new Error(
      `Error executing easter egg ${tag}: The code for the easter egg must contain only valid key codes.`,
    );
  }

  return cleanedCodes;
}

/**
 * Converts a list of key codes into a list of string of corresponding character codes or special key names.
 *
 * @param {string[]} code - List of key codes.
 * @return {string[]} - List of corresponding character codes or special key names.
 */
export const codeToChars = (code: string[]): string[] =>
  code
    .filter((c) => c !== "")
    .map((c) => Object.keys(SPECIAL_KEYS).includes(c) ? SPECIAL_KEYS[c] : c);
