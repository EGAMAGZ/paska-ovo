/**
 * @module
 * 
 * This module contains the types for the project.
 */

/**
 * Type with the properties of an easter egg.
 * 
 */
export type EasterEgg = {
    code: string[],
    onFound: () => void,
    onFinish?: () => void,
    tag: string
};

/**
 *  
 * 
 * */
export interface EasterEggState {
    [code: string]: number
}

/**
 * Type with the properties of a callback.
 * 
 */
export type Callback = (activeEasterEgg: EasterEgg) => void;