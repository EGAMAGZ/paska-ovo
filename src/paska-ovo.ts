/**	
 * This module contains the PaskaOvo class and its methods.
 * 
 * @module
 */

import type { Callback, EasterEgg } from "./types.ts";
import { codeToChars } from "./util/code.ts";

/**
 * This class represents the PaskaOvo class.
 */
export class PaskaOvo {
	private easterEggs: EasterEgg[] = [];
	private callbacks: Callback[] = [];

	private keysPressed: string[] = [];

	constructor();

	/**
	 * Constructs a new instance of the class with optional parameters for an easter egg.
	 *
	 * @param {string} code - Sequence of keys to trigger the easter egg.
	 * @param {() => void} fn - Function to execute when the easter egg is triggered.
	 * @param {string} tag - Tag to identify the easter egg.
	 */
	constructor(code?: string, fn?: () => void, tag?: string) {
		if (code && fn && tag) {
			this.easterEggs.push({ code, fn, tag });
		}
	}

	/**
	 * Adds an easter egg to the easterEggs array of the current instance of PaskaOvo.
	 *
	 * @param {string} code - Sequence of keys to trigger the easter egg.
	 * @param {() => void} fn - Function to execute when the easter egg is triggered.
	 * @param {string} tag - Tag to identify the easter egg.
	 * @return {this} - Current instance of PaskaOvo.
	 */
	public addCode(code: string, fn: () => void, tag: string): this {
		this.easterEggs.push({ code: codeToChars(code), fn, tag });

		return this;
	}

	/**
	 * Handles the key event for the current instance of PaskaOvo.
	 *
	 * @param {KeyboardEvent} event - The key event to handle.
	 */
	private handleKeyEvent(event: KeyboardEvent) {
		const { key } = event;
		if (this.easterEggs.length === 0) {
			return;
		}

		this.keysPressed.push(key);

		this.easterEggs.forEach((easterEgg) => {
			const matches = this.keysPressed.toString().includes(easterEgg.code)
			if (matches) {
				easterEgg.fn();

				this.callbacks.forEach(callback => callback(easterEgg));

				this.reset();
			}
		});
	}

	/**
	 * Resets the keysPressed array to an empty array.
	 */
	private reset() {
		this.keysPressed = [];
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
	 * Adds an event listener to the document for keyup events.
	 */
	public listen() {
		document.addEventListener("keyup", this.handleKeyEvent, false);
	}
}

