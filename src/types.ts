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
    /**
     * Sequence of keys that will trigger the easter egg.
     */
    code: string[],
    /**
     * Function to call when the easter egg is found.
     */
    onFound: () => void,
    /**
     * Tag to identify the easter egg.
     * */
    tag: string,
    /**
     * Function to call when the easter egg is finished. Will be called once the 
     * onFound function is called automatically or after the duration if it is set.
     * */
    onFinish?: () => void,
    /**
     * Duration of the easter egg. Once it is finished, onFinish will be called. 
     * */
    duration?: number,
};

/**
 * State of an easter egg. Stores the actual position in the code, the index 
 * position in the code, as the keys are pressed and the tag of an easter egg.
 * */
export interface EasterEggState {
    /**
     * Tag of the esater egg with the index in the code.
     */
    [tag: string]: number
}

/**
 * Callback function that will be called when an easter egg is found.
 * 
 */
export type Callback = (activeEasterEgg: EasterEgg) => void;
