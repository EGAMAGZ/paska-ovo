import { afterAll, beforeEach, describe, it } from "@std/testing/bdd";
import { DOMParser, type HTMLDocument } from "@b-fuze/deno-dom";
import { PaskaOvo } from "./paska_ovo.ts";
import { assertEquals } from "@std/assert";
import type { EasterEgg } from "./types.ts";

// Mock KeyboardEvent for Deno environment
class KeyboardEvent extends Event {
  key: string;
  constructor(type: string, options: { key: string }) {
    super(type);
    this.key = options.key;
  }
}

// Mock TouchEvent for Deno environment
class TouchEvent extends Event {
  changedTouches: { pageX: number; pageY: number }[];
  constructor(type: string, options: { pageX: number; pageY: number }) {
    super(type);
    this.changedTouches = [{
      pageX: options.pageX,
      pageY: options.pageY,
    }];
  }
}

function simulateKeyPress(key: string) {
  const event = new KeyboardEvent("keyup", { key });
  document.dispatchEvent(event);
}

function simulateSwipe(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  const touchStart = new TouchEvent("touchstart", {
    pageX: startX,
    pageY: startY,
  });
  const touchEnd = new TouchEvent("touchend", { pageX: endX, pageY: endY });
  document.dispatchEvent(touchStart);
  document.dispatchEvent(touchEnd);
}

describe("PaskaOvo", () => {
  const originalDom = globalThis.document;
  let dom: HTMLDocument;
  let paskaOvo: PaskaOvo;

  beforeEach(() => {
    dom = new DOMParser().parseFromString(
      "<div id='greeting'>Hello World!</div>",
      "text/html",
    );
    // @ts-ignore: Replaces global document with a dom for testing
    globalThis.document = dom;
    paskaOvo = new PaskaOvo();
  });

  describe("Keyboard Easter Eggs", () => {
    describe("Basic Functionality", () => {
      it("should trigger easter egg when correct sequence is entered", () => {
        const greeting = dom.getElementById("greeting");
        const easterEgg: EasterEgg = {
          code: ["a", "b", "c", "d"],
          tag: "ABCD",
          onFound: () => {
            greeting!.textContent = "Goodbye World!";
          },
        };

        paskaOvo.addKeyboardEasterEgg(easterEgg);
        assertEquals(greeting?.textContent, "Hello World!");

        paskaOvo.listen();
        easterEgg.code.forEach(simulateKeyPress);
        assertEquals(greeting?.textContent, "Goodbye World!");

        paskaOvo.stop();
      });

      it("should handle easter egg with duration and onFinish callback", async () => {
        const greeting = dom.getElementById("greeting");
        const easterEgg: EasterEgg = {
          code: ["a", "b", "c", "d"],
          tag: "ABCD",
          onFound: () => {
            greeting!.textContent = "Goodbye World!";
          },
          onFinish: () => {
            greeting!.textContent = "Welcome back!";
          },
          duration: 1_000,
        };

        paskaOvo.addKeyboardEasterEgg(easterEgg);
        assertEquals(greeting?.textContent, "Hello World!");

        paskaOvo.listen();
        easterEgg.code.forEach(simulateKeyPress);
        assertEquals(greeting?.textContent, "Goodbye World!");

        await new Promise((resolve) => setTimeout(resolve, 1_200));
        assertEquals(greeting?.textContent, "Welcome back!");

        paskaOvo.stop();
      });
    });

    describe("Multiple Easter Eggs", () => {
      it("should trigger only the exact matching easter egg when codes are similar", () => {
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
            code: ["a", "b", "e", "d"],
            tag: "ABED",
            onFound: () => {},
          },
        ];

        easterEggs.forEach((easterEgg) => {
          paskaOvo.addKeyboardEasterEgg(easterEgg);
        });

        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        [..."abcd"].forEach(simulateKeyPress);
        assertEquals(foundEasterEggs, ["ABCD"]);

        paskaOvo.stop();
      });

      it("should detect all matching easter eggs in sequence", () => {
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

        easterEggs.forEach((easterEgg) => {
          paskaOvo.addKeyboardEasterEgg(easterEgg);
        });

        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        [..."abcdefg"].forEach(simulateKeyPress);
        assertEquals(foundEasterEggs, ["ABCD", "ABCD+", "EFG"]);

        paskaOvo.stop();
      });
    });

    describe("Special Keys", () => {
      it("should handle arrow keys and regular keys in sequence", () => {
        const foundEasterEggs: string[] = [];
        const easterEgg: EasterEgg = {
          code: [
            "up",
            "up",
            "down",
            "down",
            "down",
            "left",
            "right",
            "left",
            "right",
            "a",
            "b",
          ],
          tag: "Keyboard Pattern",
          onFound: () => {},
        };

        paskaOvo.addKeyboardEasterEgg(easterEgg);
        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        [
          "ArrowUp",
          "ArrowUp",
          "ArrowDown",
          "ArrowDown",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "ArrowLeft",
          "ArrowRight",
          "a",
          "b",
        ].forEach(simulateKeyPress);
        assertEquals(foundEasterEggs, ["Keyboard Pattern"]);

        paskaOvo.stop();
      });
    });

    describe("Error Handling", () => {
      it("should handle errors in onFound callback gracefully", () => {
        const consoleSpy = {
          error: console.error,
        };
        console.error = () => {}; // Suppress console.error during test

        const easterEgg: EasterEgg = {
          code: ["a", "b"],
          tag: "Error Test",
          onFound: () => {
            throw new Error("Test error");
          },
        };

        paskaOvo.addKeyboardEasterEgg(easterEgg);
        paskaOvo.listen();

        // Should not throw
        ["a", "b"].forEach(simulateKeyPress);

        paskaOvo.stop();
        console.error = consoleSpy.error; // Restore console.error
      });

      it("should reset pattern if wrong key is pressed", () => {
        const foundEasterEggs: string[] = [];
        const easterEgg: EasterEgg = {
          code: ["a", "b", "c"],
          tag: "ABC Pattern",
          onFound: () => {},
        };

        paskaOvo.addKeyboardEasterEgg(easterEgg);
        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        // Correct first key
        simulateKeyPress("a");
        // Wrong second key
        simulateKeyPress("x");
        // First character of the sequence again
        simulateKeyPress("a");
        // Interrupting the sequence with a wrong key
        simulateKeyPress("z");

        // No easter egg should be detected at this point
        assertEquals(foundEasterEggs, []);

        // Now do the full sequence correctly
        simulateKeyPress("a");
        simulateKeyPress("b");
        simulateKeyPress("c");

        // The easter egg should be found now that we've done a complete sequence
        assertEquals(foundEasterEggs, ["ABC Pattern"]);

        paskaOvo.stop();
      });
    });
  });

  describe("Swipe Easter Eggs", () => {
    describe("Basic Functionality", () => {
      it("should trigger easter egg when correct swipe sequence is entered", () => {
        const greeting = dom.getElementById("greeting");
        const easterEgg: EasterEgg = {
          code: ["up", "right", "down"],
          tag: "Swipe Pattern",
          onFound: () => {
            greeting!.textContent = "Swipe detected!";
          },
        };

        paskaOvo.addSwipeEasterEgg(easterEgg);
        assertEquals(greeting?.textContent, "Hello World!");

        paskaOvo.listen();
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 200, 100); // right
        simulateSwipe(200, 100, 200, 200); // down

        assertEquals(greeting?.textContent, "Swipe detected!");
        paskaOvo.stop();
      });

      it("should handle easter egg with duration and onFinish callback", async () => {
        const greeting = dom.getElementById("greeting");
        const easterEgg: EasterEgg = {
          code: ["up", "right"],
          tag: "Swipe with Duration",
          onFound: () => {
            greeting!.textContent = "Swipe detected!";
          },
          onFinish: () => {
            greeting!.textContent = "Swipe finished!";
          },
          duration: 1_000,
        };

        paskaOvo.addSwipeEasterEgg(easterEgg);
        assertEquals(greeting?.textContent, "Hello World!");

        paskaOvo.listen();
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 200, 100); // right

        assertEquals(greeting?.textContent, "Swipe detected!");

        await new Promise((resolve) => setTimeout(resolve, 1_200));
        assertEquals(greeting?.textContent, "Swipe finished!");

        paskaOvo.stop();
      });
    });

    describe("Multiple Easter Eggs", () => {
      it("should handle multiple swipe easter eggs with similar patterns", () => {
        const foundEasterEggs: string[] = [];
        const easterEggs: EasterEgg[] = [
          {
            code: ["up", "right", "down"],
            tag: "URD Pattern",
            onFound: () => {},
          },
          {
            code: ["up", "right", "down", "left"],
            tag: "URDL Pattern",
            onFound: () => {},
          },
          {
            code: ["down", "left", "up"],
            tag: "DLU Pattern",
            onFound: () => {},
          },
        ];

        easterEggs.forEach((easterEgg) => {
          paskaOvo.addSwipeEasterEgg(easterEgg);
        });

        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 200, 100); // right
        simulateSwipe(200, 100, 200, 200); // down

        assertEquals(foundEasterEggs, ["URD Pattern"]);
        paskaOvo.stop();
      });

      it("should detect all matching swipe easter eggs in sequence", () => {
        const foundEasterEggs: string[] = [];
        const easterEggs: EasterEgg[] = [
          {
            code: ["up", "right"],
            tag: "UR Pattern",
            onFound: () => {},
          },
          {
            code: ["up", "right", "down"],
            tag: "URD Pattern",
            onFound: () => {},
          },
          {
            code: ["down", "left"],
            tag: "DL Pattern",
            onFound: () => {},
          },
        ];

        easterEggs.forEach((easterEgg) => {
          paskaOvo.addSwipeEasterEgg(easterEgg);
        });

        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 200, 100); // right
        simulateSwipe(200, 100, 200, 200); // down
        simulateSwipe(200, 200, 50, 200); // left

        assertEquals(foundEasterEggs, [
          "UR Pattern",
          "URD Pattern",
          "DL Pattern",
        ]);
        paskaOvo.stop();
      });
    });

    describe("Error Handling", () => {
      it("should handle errors in swipe easter egg callbacks gracefully", () => {
        const consoleSpy = {
          error: console.error,
        };
        console.error = () => {}; // Suppress console.error during test

        const easterEgg: EasterEgg = {
          code: ["up", "right"],
          tag: "Error Test",
          onFound: () => {
            throw new Error("Test error");
          },
        };

        paskaOvo.addSwipeEasterEgg(easterEgg);
        paskaOvo.listen();

        // Should not throw
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 200, 100); // right

        paskaOvo.stop();
        console.error = consoleSpy.error; // Restore console.error
      });

      it("should reset pattern if wrong direction is swiped", () => {
        const foundEasterEggs: string[] = [];
        const easterEgg: EasterEgg = {
          code: ["up", "right", "down"],
          tag: "Swipe Pattern",
          onFound: () => {},
        };

        paskaOvo.addSwipeEasterEgg(easterEgg);
        paskaOvo.addCallback((easterEgg) => {
          foundEasterEggs.push(easterEgg.tag);
        });

        paskaOvo.listen();
        simulateSwipe(100, 200, 100, 50); // up
        simulateSwipe(100, 100, 50, 100); // left (wrong)
        simulateSwipe(100, 100, 200, 100); // right
        simulateSwipe(200, 100, 200, 200); // down

        // Should not trigger because pattern was broken
        assertEquals(foundEasterEggs, []);

        paskaOvo.stop();
      });
    });
  });

  afterAll(() => {
    globalThis.document = originalDom;
  });
});
