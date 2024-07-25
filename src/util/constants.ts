/**
 * @module
 * This module contains constants used in the project.
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

/**
 * List of tag input elements.
 */

export const INPUT_ELEMENTS = [
  "textarea",
  "input",
  "select",
];
