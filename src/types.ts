/**
 * @module
 * This module contains the types for the project.
 * 
 */

/**
 * Type with the properties of an easter egg.
 * 
 */
export type EasterEgg = {
    code: string[],
    onFound: () => void,
    tag: string,
    onFinish?: () => void,
    duration?: number,
};

/**
 * Type to manage the state, actual key pressed, of each easter egg registered
 * 
 * */
export interface EasterEggState {
    [tag: string]: number
}

/**
 * Type with the properties of a callback.
 * 
 */
export type Callback = (activeEasterEgg: EasterEgg) => void;
