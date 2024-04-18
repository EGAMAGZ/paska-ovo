import type { Callback, EasterEgg } from "./types.ts";

export class PaskaOvo {
	private easterEggs: EasterEgg[] = [];
	private callbacks: Callback[] = [];

	constructor();

	constructor(code?: string, callable?: () => void, tag?: string) {
		if (code && callable && tag) {
			this.easterEggs.push({
				code,
				callable,
				tag
			});
		}
	}

	public addCode(code: string, callable: () => void, tag: string): this {
		this.easterEggs.push({
			code,
			callable,
			tag
		});

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
		document.addEventListener("keydown", this.handleKeyEvent, false);

		return this;
	}
}

