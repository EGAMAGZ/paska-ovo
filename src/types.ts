/**
 * @module
 * This module contains the types for the project.
 */

/**
 * Type with the properties of an easter egg.
 *
 * @example
 * A simple easter egg:
 * ```typescript
 * import { EasterEgg } from "@paska/ovo";
 *
 * const easterEgg: EasterEgg = {
 *  code: ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"],
 *  onFound: () => {
 *    // Do something when the easter egg is found
 *  },
 *  tag: "Konami",
 * }
 * ```
 *
 * @example
 * An easter egg with a duration:
 * ```typescript
 * const easterEgg: EasterEgg = {
 *  code: ["up", "right", "down", "left"],
 *  onFound: () => {
 *      // Do something when the easter egg is found
 *  },
 *  onFinish() {
 *      // Do something when the duration of the easter egg is over
 *  },
 *  duration: 1000,
 *  tag: "Barrel Roll"
 * }
 * ```
 */
export type EasterEgg = {
  /**
   * Key sequence that will activate the easter egg. The code can contain
   * letters (which will only be detected as lowercase), numbers and navigation
   * and control keys. The navigation and control keys are indicated by the following nomenclature:
   * * `up`: `ArrowUp`
   * * `down`: `ArrowDown`
   * * `left`: `ArrowLeft`
   * * `right`: `ArrowRight`
   * * `enter`: `Enter`
   * * `space`: `Space`
   * * `ctrl`: `Control`
   * * `alt`: `Alt`
   * * `tab`: `Tab`
   * * `esc`: `Escape`
   * * `slash`: `/`
   */
  code: string[];
  /**
   * Function to call when the easter egg is found.
   */
  onFound: () => void;
  /**
   * Tag to identify the easter egg.
   */
  tag: string;
  /**
   * Function to call when the easter egg is finished. Will be called once the
   * onFound function is called automatically or after the duration if it is set.
   */
  onFinish?: () => void;
  /**
   * Duration in milliseconds of the easter egg. Once it is finished, onFinish will be called.
   */
  duration?: number;
};

/**
 * State of an easter egg. Stores the actual position in the code, the index
 * position in the code, as the keys are pressed and the tag of an easter egg.
 */
export interface EasterEggState {
  /**
   * Tag of the esater egg with the index in the code.
   */
  [tag: string]: number;
}

/**
 * Callback function that will be called when an easter egg is found.
 */
export type Callback = (activeEasterEgg: EasterEgg) => void;
