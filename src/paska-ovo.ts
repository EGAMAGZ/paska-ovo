/**	
 * This module contains the PaskaOvo class and its methods.
 * 
 * @module
 */

import type { Callback, EasterEgg, EasterEggState } from "@/types.ts";
import { codeToChars } from "@/util/code.ts";

/**
 * Class that is used to manage easter eggs.
 */
export class PaskaOvo {
	private easterEggs: EasterEgg[] = [];
	private callbacks: Callback[] = [];
	private easterEggState: EasterEggState = {};

	private keyListener?: ((event: KeyboardEvent) => void);

	/**
	 * Constructs a new instance of the class with optional parameters for an easter egg.
	 *
	 * @param easterEgg - The easter egg to add.
	 */
	constructor(easterEgg?: EasterEgg) {
		if (easterEgg) {
			this.addCode(easterEgg);
		}
	}

	/**
	 * Adds an easter egg to the easterEggs array of the current instance of PaskaOvo.
	 *
	 * @param {EasterEgg} easterEgg - The easter egg to add.
	 * @return {this} Current instance of PaskaOvo.
	 */
	public addCode(easterEgg: EasterEgg): this {
		this.easterEggs.push({
			...easterEgg,
			code: codeToChars(easterEgg.code),
		});
		return this;
	}

	/**
	 * Handles the key event for the current instance of PaskaOvo.
	 *
	 * @param {KeyboardEvent} event - The key event to handle.
	 * @param {EasterEgg[]} easterEggs - List of easter eggs to trigger.
	 */
	private handleKeyEvent(event: KeyboardEvent, easterEggs: EasterEgg[]) {
		if (easterEggs.length === 0) {
			return;
		}

		const { key } = event;

		easterEggs.forEach((easterEgg) => {
			const actualCodePosition = this.easterEggState[easterEgg.tag] || 0;
			const actualCode = easterEgg.code[actualCodePosition];

			if (key !== actualCode) {
				this.easterEggState[easterEgg.tag] = 0;
				return;
			}

			const nextCodePosition = actualCodePosition + 1;

			if (nextCodePosition === easterEgg.code.length) {
				easterEgg.onFound();
				this.callbacks.forEach((callback) => callback(easterEgg));
				this.easterEggState[easterEgg.tag] = 0;

			} else {
				this.easterEggState[easterEgg.tag] = nextCodePosition;
			}
		});
	}

	/**
	 * Creates a function that handles the key event.
	 *
	 * @param {EasterEgg[]} easterEggs - List of easter eggs to trigger.
	 * @return {(event: KeyboardEvent) => void} Function that handles the key event.
	 */
	private createHandleKeyEvent(easterEggs: EasterEgg[]): (event: KeyboardEvent) => void {
		return (event: KeyboardEvent) => {
			this.handleKeyEvent(event, easterEggs);
		}
	}

	/**
	 * Adds a callback to the callbacks array.
	 *
	 * @param {Callback} callback - The callback to add.
	 * @return {this} The current instance of PaskaOvo.
	 */
	public addCallback(callback: Callback): this {
		this.callbacks.push(callback);

		return this;
	}

	/**
	 * Adds an event listener to the document for keyup events if it is not already added.
	*/
	public listen() {
		if (this.keyListener !== undefined) {
			this.stop();
		}

		this.keyListener = this.createHandleKeyEvent(this.easterEggs);

		document.addEventListener("keyup", this.keyListener);
	}

	/**
	 * Removes the event listener from the document.
	 * */
	public stop() {
		if (this.keyListener) {
			document.removeEventListener("keyup", this.keyListener);
		}
	}
}

