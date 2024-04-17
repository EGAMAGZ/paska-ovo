import type { Egg } from "./types.ts";

export class EasterEgg {
	private eggs: Egg[] = [];

	constructor();

	constructor(code?: string, callable?: () => void, tag?: string) {
		if (code && callable && tag) {
			this.eggs.push({
				code,
				callable,
				tag
			});
		}
	}

	public addCode(code: string, callable: () => void, tag: string): this {
		this.eggs.push({
			code,
			callable,
			tag
		});
		return this;
	}
	
}

