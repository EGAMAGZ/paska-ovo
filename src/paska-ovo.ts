/**
 * @module
 *
 * This module contains the PaskaOvo class and its methods. It is the entry
 * point of the library.
 */

import type { Callback, EasterEgg, EasterEggState } from "./types.ts";
import { codeToChars } from "./util/code.ts";
import { isInputElement } from "./util/dom.ts";

/**
 * Class that is used to manage easter eggs.
 *
 * @example
 * ```typescript
 * import { HistoricalCodes, PaskaOvo } from "@egamagz/paska-ovo";
 *
 * const paskaOvo = new PaskaOvo()
 * 	.addEasterEgg({
 * 		code: HistoricalCodes.BarrelRoll,
 * 		onFound: () => {
 * 		//...
 * 		},
 * 		onFinish() {
 * 		// ...
 * 		},
 * 		duration: 1000,
 * 		tag: "Barrel Roll"
 * 	})
 * 	.addEasterEgg({
 * 		code: HistoricalCodes.Konami,
 * 		onFound: () => {
 * 		// ...
 * 		},
 * 		tag: "Konami"
 * 	})
 * 	.addEasterEgg({
 * 		code: ["a", "w", "e", "s", "o", "m", "e"],
 * 		onFound: () => {
 * 		// ...
 * 		},
 * 		tag: "Awesome"
 * 	})
 * 	.addCallback((easterEgg) => {
 * 		alert(`You found the easter egg: ${easterEgg.tag}`)
 * 	});
 *
 * 	// Listen to keyboard events
 * 	document.getElementById("add-easter-egg").addEventListener("click", () => {
 * 		paskaOvo.listen();
 * 	});
 *
 * 	// Stop listening to keyboard events
 * 	document
 * 		.getElementById("remove-easter-egg")
 * 		.addEventListener("click", () => {
 * 			paskaOvo.stop();
 * 		});
 * ```
 */
export class PaskaOvo {
  /**
   * List of easter eggs registered.
   */
  private easterEggs: EasterEgg[] = [];

  /**
   * List of callbacks registered for each easter egg when it is found.
   */
  private callbacks: Callback[] = [];

  /**
   * State of each key pressed for each easter egg.
   */
  private easterEggState: EasterEggState = {};

  /**
   * The key listener for the current instance of PaskaOvo.
   */
  private keyListener?: (event: KeyboardEvent) => void;

  /**
   * Constructs a new instance of the class with optional parameters for an easter egg.
   *
   * @param {EasterEgg} easterEgg - The easter egg to add.
   */
  constructor(easterEgg?: EasterEgg) {
    if (easterEgg) {
      this.addEasterEgg(easterEgg);
    }
  }

  /**
   * Adds an easter egg to the easterEggs array of the current instance of
   * PaskaOvo.
   *
   * @param {EasterEgg} easterEgg - The easter egg to add.
   * @return {this} Current instance of PaskaOvo.
   */
  public addEasterEgg(easterEgg: EasterEgg): this {
    const code = codeToChars(easterEgg.code);

    if (code.length < 1) {
      throw new Error(`Error executing easter egg ${easterEgg.tag}: The code for the easter egg must contain at least one non-empty character.`);
    }

    this.easterEggs.push({
      ...easterEgg,
      code,
    });
    return this;
  }

  /**
   * Handles the key event for the current instance of PaskaOvo. In case the
   * active element is an input element (select, input or textarea), it will
   * not handle the key event to avoid triggering an easter egg.
   *
   * @param {KeyboardEvent} event - The key event to handle.
   * @param {EasterEgg[]} easterEggs - List of easter eggs to trigger.
   */
  private handleKeyEvent(event: KeyboardEvent, easterEggs: EasterEgg[]) {
    const { key } = event;

    if (isInputElement(document.activeElement)) return;

    for (const easterEgg of easterEggs) {
      const actualCodePosition = this.easterEggState[easterEgg.tag] || 0;
      const actualCode = easterEgg.code[actualCodePosition];

      if (key !== actualCode) {
        this.easterEggState[easterEgg.tag] = 0;
        continue;
      }

      const nextCodePosition = actualCodePosition + 1;

      if (nextCodePosition === easterEgg.code.length) {
        this.executeEasterEgg(easterEgg);

        this.easterEggState[easterEgg.tag] = 0;
      } else {
        this.easterEggState[easterEgg.tag] = nextCodePosition;
      }
    }
  }

  /**
   * Executes an easter egg, and calls its callbacks. After the easter egg is
   * executed, it will execute its onFinish callback if it has one. If the
   * easter egg also has a duration, the onFinish callback will be executed
   * after the duration.
   *
   * @param {EasterEgg} easterEgg - The easter egg to execute.
   */
  private executeEasterEgg(easterEgg: EasterEgg) {
    try {
      easterEgg.onFound();

      this.callbacks.forEach((callback) => callback(easterEgg));

      if (easterEgg.onFinish) {
        if (easterEgg.duration) {
          setTimeout(
            easterEgg.onFinish,
            easterEgg.duration,
          );
        } else {
          easterEgg.onFinish();
        }
      }
    } catch (error) {
      console.error(`Error executing easter egg ${easterEgg.tag}:`, error);
    }
  }

  /**
   * Creates a function that handles the key event.
   *
   * @param {EasterEgg[]} easterEggs - List of easter eggs to trigger.
   * @return {(event: KeyboardEvent) => void} Function that handles the key event.
   */
  private createHandleKeyEvent(
    easterEggs: EasterEgg[],
  ): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      this.handleKeyEvent(event, easterEggs);
    };
  }

  /**
   * Adds a callback to list of callbacks to be called when an easter egg is found.
   *
   * @param {Callback} callback - The callback to add.
   * @return {this} The current instance of PaskaOvo.
   */
  public addCallback(callback: Callback): this {
    this.callbacks.push(callback);

    return this;
  }

  /**
   * Creates an event listener to the instance for keyup events if it is not already created.
   */
  public listen() {
    if (this.keyListener) {
      this.stop();
    }

    this.keyListener = this.createHandleKeyEvent(this.easterEggs);

    document.addEventListener("keyup", this.keyListener);
  }

  /**
   * Removes the event listener from the instance.
   */
  public stop() {
    if (this.keyListener) {
      document.removeEventListener("keyup", this.keyListener);
      this.keyListener = undefined;
    }
  }
}
