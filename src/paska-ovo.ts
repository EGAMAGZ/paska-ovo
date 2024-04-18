import type { Callback, EasterEgg } from "./types.ts";
import { codeToChars } from "./util/code.ts";

export class PaskaOvo {
	private easterEggs: EasterEgg[] = [];
	private callbacks: Callback[] = [];

	private keysPressed: string[] = [];

	constructor();

	constructor(code?: string, fn?: () => void, tag?: string) {
		if (code && fn && tag) {
			this.easterEggs.push({ code, fn, tag });
		}
	}

	public addCode(code: string, fn: () => void, tag: string): this {
		this.easterEggs.push({ code: codeToChars(code), fn, tag });

		return this;
	}

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
		})
	}

	private reset() {
		this.keysPressed = [];
	}

	public addCallback(callback: Callback): this {
		this.callbacks.push(callback);

		return this;
	}

	public listen() {
		document.addEventListener("keyup", this.handleKeyEvent, false);
	}
}

