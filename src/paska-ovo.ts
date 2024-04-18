import type { Callback, EasterEgg } from "./types.ts";
import { codeToChars } from "./util/code.ts";

export class PaskaOvo {
	private easterEggs: EasterEgg[] = [];
	private callbacks: Callback[] = [];

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
		console.log(event.code)
	}

	public addCallback(callback: Callback): this {
		this.callbacks.push(callback);

		return this;
	}

	public listen() {
		document.addEventListener("keyup", this.handleKeyEvent, false);
	}
}

