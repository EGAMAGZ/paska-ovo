import { INPUT_ELEMENTS } from "./constants.ts"

/**
 * Checks if the given element is an input element.
 *
 * @param {Element | null} actualElement - The element to check.
 * @return {boolean} Returns true if the element is an input element, false otherwise.
 */
export const isInputElement =
    (actualElement: Element | null): boolean =>
        Boolean(actualElement && INPUT_ELEMENTS.includes(actualElement.tagName.toLowerCase()));
