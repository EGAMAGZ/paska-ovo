/**
 * This module contains the types for the project.
 * 
 * @module
 */

/**
 * Type with the properties of an easter egg.
 */
export type EasterEgg = {
    code: string,
    fn: () => void,
    tag: string
};


/**
 * Type with the properties of a callback.
 * 
 */
export type Callback = (activeEasterEgg: EasterEgg) => void;