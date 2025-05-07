import { afterAll, beforeEach, describe, it } from "@std/testing/bdd";
import { DOMParser, type HTMLDocument } from "@b-fuze/deno-dom";
import { PaskaOvo } from "./paska_ovo.ts";
import { assertEquals } from "@std/assert/equals";
import type { EasterEgg } from "./types.ts";
// Mock KeyboardEvent for Deno environment
class KeyboardEvent extends Event {
  key: string;
  constructor(type: string, options: { key: string }) {
    super(type);
    this.key = options.key;
  }
}
function pressKey(key: string) {
  const event = new KeyboardEvent("keyup", { key });
  document.dispatchEvent(event);
}
describe("PaskaOvo - Keyboard EasterEggs", () => {
  const originalDom = globalThis.document;
  let dom: HTMLDocument;
  beforeEach(() => {
    dom = new DOMParser().parseFromString(
      "<div id='greeting'>Hello World!</div>",
      "text/html",
    );
    // @ts-ignore: Replaces global document with a dom for testing
    globalThis.document = dom;
  });
  it("sample", () => {
    const greeting = dom.getElementById("greeting");
    const easterEgg: EasterEgg = {
      code: ["a", "b", "c", "d"],
      tag: "ABCD",
      onFound: () => {
        greeting!.textContent = "Goodbye World!";
      },
    };
    const paskaOvo = new PaskaOvo();
    paskaOvo.addKeyboardEasterEgg(easterEgg);
    assertEquals(greeting?.textContent, "Hello World!");
    paskaOvo.listen();
    easterEgg.code.forEach(pressKey);
    assertEquals(greeting?.textContent, "Goodbye World!");
    paskaOvo.stop();
  });
  it("delay", () => {
  });
  it("Close codes", () => {
  });
  it("detect all matching eastereggs", () => {
    const foundEasterEggs: string[] = [];
    const easterEggs: EasterEgg[] = [
      {
        code: ["a", "b", "c", "d"],
        tag: "ABCD",
        onFound: () => {},
      },
      {
        code: ["a", "b", "c", "d", "e"],
        tag: "ABCD+",
        onFound: () => {},
      },
      {
        code: ["e", "f", "g"],
        tag: "EFG",
        onFound: () => {},
      },
    ];
    const paskaOvo = new PaskaOvo();
    easterEggs.forEach((easterEgg) => {
      paskaOvo.addKeyboardEasterEgg(easterEgg);
    });
    paskaOvo.addCallback((easterEgg) => {
      foundEasterEggs.push(easterEgg.tag);
    });
    paskaOvo.listen();
    [..."abcdefg"].forEach(pressKey);
    assertEquals(foundEasterEggs, ["ABCD", "ABCD+", "EFG"]);
    paskaOvo.stop();
  });
  afterAll(() => {
    globalThis.document = originalDom;
  });
});
