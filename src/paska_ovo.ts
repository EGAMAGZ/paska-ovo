/**
 * @module
 *
 * This module contains the PaskaOvo class and its methods. It is the entry
 * point of the library.
 */
import type { Callback, EasterEgg, EasterEggState } from "./types.ts";
import {
  codeToChars,
  validateKeyboardCode,
  validateSwipeCode,
} from "./util/code.ts";
import { calculateSwipeDirection, type SwipePositions } from "./util/swipe.ts";
import { isInputElement } from "./util/dom.ts";
const DEFAULT_DURATION = 1_000;
/**
 * Class that is used to manage easter eggs.
 *
 * @example
 * ```typescript
 * import { HistoricalCodes, PaskaOvo, type EasterEgg } from "@egamagz/paska-ovo";
 *
 * const paskaOvo = new PaskaOvo()
 * 	.addKeyboardEasterEgg({
 * 		code: HistoricalCodes.Konami,
 * 		onFound: () => {
 * 		//...
 * 		},
 * 		onFinish() {
 * 		// ...
 * 		},
 * 		duration: 1000,
 * 		tag: "Barrel Roll"
 * 	})
 * 	.addKeyboardEasterEgg({
 * 		code: ["a", "w", "e", "s", "o", "m", "e"],
 * 		onFound: () => {
 * 		// ...
 * 		},
 * 		tag: "Awesome"
 * 	})
 *  .addSwipeEasterEgg({
 *    code: ["up", "right", "down"],
 *    onFound: ()=>{
 *      //...
 *    },
 *    tag: "URD"
 *  })
 * 	.addCallback((easterEgg: EasterEgg) => {
 * 		alert(`You found the easter egg: ${easterEgg.tag}`)
 * 	});
 *
 * 	// Listen to keyboard events
 * 	document.getElementById("add-easter-egg")?.addEventListener("click", () => {
 * 		paskaOvo.listen();
 * 	});
 *
 * 	// Stop listening to keyboard events
 * 	document.getElementById("remove-easter-egg")?.addEventListener("click", () => {
 * 			paskaOvo.stop();
 * 	});
 * ```
 */
export class PaskaOvo {
  /**
   * List of easter eggs registered triggered by typing on a keyboard
   */
  private keyboardEasterEggs: EasterEgg[] = [];
  /**
   * List of easter eggs registered triggered by swiping
   */
  private swipeEasterEggs: EasterEgg[] = [];
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
   * Stores the coordinates for tracking swipe gestures.
   * Contains start and end positions for both X and Y axes.
   */
  private swipePositions: SwipePositions = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };
  /**
   * Event listener for touch start events.
   * Used to track the beginning of a swipe gesture.
   */
  private touchStartListener?: (event: TouchEvent) => void;
  /**
   * Event listener for touch end events.
   * Used to track the end of a swipe gesture.
   */
  private touchEndListener?: (event: TouchEvent) => void;
  /**
   * Controller for managing event listener cleanup.
   * Used to abort event listeners when stopping the easter egg detection.
   */
  private controller = new AbortController();
  /**
   * Adds an easter egg to the easterEggs array of the current instance of
   * PaskaOvo.
   *
   * @example
   * ```typescript
   * import { PaskaOvo } from "@egamagz/paska-ovo";
   *
   * const paskaOvo = new PaskaOvo();
   * paskaOvo.addKeyboardEasterEgg({
   * 	code: ["up", "up", "down", "down", "down", "left", "right", "left", "right", "a", "b"],
   * 	onFound: ()=> console.log("Keyboard pattern detected!"),
   * 	tag: "Keyboard Pattern"
   * });
   * ```
   *
   * @param {EasterEgg} easterEgg - The easter egg to add.
   * @return {this} Current instance of PaskaOvo.
   */
  public addKeyboardEasterEgg(easterEgg: EasterEgg): this {
    const validCodes = validateKeyboardCode(easterEgg.code, easterEgg.tag);
    const code = codeToChars(validCodes);
    this.keyboardEasterEggs.push({
      ...easterEgg,
      code,
    });
    return this;
  }

  /**
   * Adds a swipe-based easter egg to the swipeEasterEggs array.
   * The easter egg will be triggered when the user performs a swipe gesture
   * that matches the specified pattern.
   *
   * @example
   * ```typescript
   * import { PaskaOvo } from "@egamagz/paska-ovo";
   * const paskaOvo = new PaskaOvo();
   * paskaOvo.addSwipeEasterEgg({
   *   code: ["up", "right", "down"],
   *   onFound: () => console.log("Swipe pattern detected!"),
   *   tag: "Swipe Pattern"
   * });
   * ```
   *
   * @param {EasterEgg} easterEgg - The easter egg to add, containing the swipe pattern and callbacks
   * @returns {this} Current instance of PaskaOvo for method chaining
   */
  public addSwipeEasterEgg(easterEgg: EasterEgg): this {
    const validCodes = validateSwipeCode(easterEgg.code, easterEgg.tag);
    this.swipeEasterEggs.push({
      ...easterEgg,
      code: validCodes,
    });
    return this;
  }
  /**
   * Handles the key event for the current instance of PaskaOvo. In case the
   * active element is an input element (select, input or textarea), it will
   * not handle the key event to avoid triggering an easter egg.
   *
   * @param {KeyboardEvent} event - The key event to handle.
   */
  private handleKeyEvent(event: KeyboardEvent) {
    const { key } = event;
    if (isInputElement(document.activeElement)) return;
    this.keyboardEasterEggs.forEach((easterEgg: EasterEgg) => {
      const actualCodePosition = this.easterEggState[easterEgg.tag] || 0;
      const actualCode = easterEgg.code[actualCodePosition];
      if (key !== actualCode) {
        this.easterEggState[easterEgg.tag] = 0;
        return;
      }
      const nextCodePosition = actualCodePosition + 1;
      if (nextCodePosition === easterEgg.code.length) {
        this.executeEasterEgg(easterEgg);
        this.easterEggState[easterEgg.tag] = 0;
      } else {
        this.easterEggState[easterEgg.tag] = nextCodePosition;
      }
    });
  }
  /**
   * Handles the touch start event by recording the initial touch position.
   * This is used to track the starting point of a swipe gesture.
   *
   * @param {TouchEvent} event - The touch event containing the initial touch coordinates
   */
  private handleTouchStartEvent(event: TouchEvent) {
    const { pageX, pageY } = event.changedTouches[0];
    this.swipePositions.startX = pageX;
    this.swipePositions.startY = pageY;
  }
  /**
   * Handles the touch end event by recording the final touch position and calculating
   * the swipe direction. If the swipe matches an easter egg pattern, it will be triggered.
   *
   * @param {TouchEvent} event - The touch event containing the final touch coordinates
   */
  private handleTouchEndEvent(event: TouchEvent) {
    const { pageX, pageY } = event.changedTouches[0];
    this.swipePositions.endX = pageX;
    this.swipePositions.endY = pageY;
    const direction = calculateSwipeDirection(this.swipePositions);
    this.swipeEasterEggs.forEach((easterEgg: EasterEgg) => {
      const actualCodePosition = this.easterEggState[easterEgg.tag] || 0;
      const actualCode = easterEgg.code[actualCodePosition];
      if (direction !== actualCode) {
        this.easterEggState[easterEgg.tag] = 0;
        return;
      }
      const nextCodePosition = actualCodePosition + 1;
      if (nextCodePosition === easterEgg.code.length) {
        this.executeEasterEgg(easterEgg);
        this.easterEggState[easterEgg.tag] = 0;
      } else {
        this.easterEggState[easterEgg.tag] = nextCodePosition;
      }
    });
  }
  /**
   * Executes an easter egg by calling its onFound callback and any registered callbacks.
   * If the easter egg has an onFinish callback, it will be executed after the specified duration.
   *
   * @param {EasterEgg} easterEgg - The easter egg to execute
   */
  private executeEasterEgg(easterEgg: EasterEgg) {
    try {
      easterEgg.onFound();
      this.callbacks.forEach((callback) => callback(easterEgg));
      if (easterEgg.onFinish) {
        setTimeout(
          easterEgg.onFinish,
          easterEgg.duration || DEFAULT_DURATION,
        );
      }
    } catch (error) {
      console.error(`Error executing easter egg ${easterEgg.tag}:`, error);
    }
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
    if (this.keyListener || this.touchStartListener || this.touchEndListener) {
      this.stop();
    }
    this.keyListener = (event: KeyboardEvent) => this.handleKeyEvent(event);
    this.touchStartListener = (event: TouchEvent) =>
      this.handleTouchStartEvent(event);
    this.touchEndListener = (event: TouchEvent) =>
      this.handleTouchEndEvent(event);
    document.addEventListener("keyup", this.keyListener, {
      signal: this.controller.signal,
    });
    document.addEventListener("touchstart", this.touchStartListener, {
      signal: this.controller.signal,
    });
    document.addEventListener("touchend", this.touchEndListener, {
      signal: this.controller.signal,
    });
  }
  /**
   * Removes the event listener from the instance.
   */
  public stop() {
    if (this.keyListener || this.touchStartListener || this.touchEndListener) {
      this.controller.abort();
      this.keyListener = undefined;
      this.touchStartListener = undefined;
      this.touchEndListener = undefined;
    }
  }
}
