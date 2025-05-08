import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  codeToChars,
  validateKeyboardCode,
  validateSwipeCode,
} from "@/util/code.ts";
import { HistoricalCodes } from "../historical_codes.ts";

describe("codeToChars", () => {
  describe("Special key conversion", () => {
    it("should convert special keys to their corresponding values", () => {
      assertEquals(
        codeToChars(["up", "down", "left", "right"]),
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
      );
    });

    it("should handle all special keys correctly", () => {
      assertEquals(
        codeToChars([
          "slash",
          "up",
          "down",
          "left",
          "right",
          "enter",
          "space",
          "ctrl",
          "alt",
          "tab",
          "esc",
        ]),
        [
          "/",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Enter",
          "Space",
          "Control",
          "Alt",
          "Tab",
          "Escape",
        ],
      );
    });
  });

  describe("Regular key handling", () => {
    it("should keep regular keys unchanged", () => {
      assertEquals(
        codeToChars(["a", "b", "c", "1", "2", "3"]),
        ["a", "b", "c", "1", "2", "3"],
      );
    });

    it("should handle mixed case letters as-is", () => {
      assertEquals(
        codeToChars(["A", "b", "C", "d"]),
        ["A", "b", "C", "d"],
      );
    });
  });

  describe("Historical codes", () => {
    it("should convert Konami code correctly", () => {
      assertEquals(
        codeToChars(HistoricalCodes.Konami),
        [
          "ArrowUp",
          "ArrowUp",
          "ArrowDown",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "ArrowLeft",
          "ArrowRight",
          "b",
          "a",
        ],
      );
    });

    it("should convert IDDQD code correctly", () => {
      assertEquals(
        codeToChars(HistoricalCodes.Iddqd),
        ["i", "d", "d", "q", "d"],
      );
    });

    it("should convert Barrel Roll code correctly", () => {
      assertEquals(
        codeToChars(HistoricalCodes.BarrelRoll),
        ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"],
      );
    });
  });
});

describe("validateKeyboardCode", () => {
  it("should validate and clean keyboard codes correctly", () => {
    assertEquals(
      validateKeyboardCode(["up", "down", "left", "right"], "test"),
      ["up", "down", "left", "right"],
    );
  });

  it("should trim and lowercase keyboard codes", () => {
    assertEquals(
      validateKeyboardCode([" UP ", "Down", " LEFT", "RIGHT "], "test"),
      ["up", "down", "left", "right"],
    );
  });

  it("should filter out empty strings", () => {
    assertEquals(
      validateKeyboardCode(["up", "", "down", "  ", "left"], "test"),
      ["up", "down", "left"],
    );
  });

  it("should throw error for empty code array", () => {
    assertThrows(
      () => validateKeyboardCode([], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain at least one non-empty character.",
    );
  });

  it("should throw error for invalid keyboard codes", () => {
    assertThrows(
      () => validateKeyboardCode(["invalid", "up"], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
    );
  });

  it("should handle mixed alphanumeric and special keys", () => {
    assertEquals(
      validateKeyboardCode(["a", "up", "1", "right", "b", "enter"], "test"),
      ["a", "up", "1", "right", "b", "enter"],
    );
  });

  it("should handle all special keys correctly", () => {
    assertEquals(
      validateKeyboardCode(
        ["slash", "up", "down", "left", "right", "enter", "space", "ctrl", "alt", "tab", "esc"],
        "test"
      ),
      ["slash", "up", "down", "left", "right", "enter", "space", "ctrl", "alt", "tab", "esc"],
    );
  });

  it("should handle mixed case letters and convert to lowercase", () => {
    assertEquals(
      validateKeyboardCode(["A", "b", "C", "d", "E"], "test"),
      ["a", "b", "c", "d", "e"],
    );
  });

  it("should handle numbers and special characters", () => {
    assertEquals(
      validateKeyboardCode(["1", "2", "3", "slash", "4", "5"], "test"),
      ["1", "2", "3", "slash", "4", "5"],
    );
  });

  it("should throw error for multi-character codes", () => {
    assertThrows(
      () => validateKeyboardCode(["ab", "up"], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
    );
  });

  it("should throw error for special characters not in SPECIAL_KEYS", () => {
    assertThrows(
      () => validateKeyboardCode(["@", "up"], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
    );
  });

  it("should handle historical codes correctly", () => {
    assertEquals(
      validateKeyboardCode(
        ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"],
        "konami"
      ),
      ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"],
    );
  });
});

describe("validateSwipeCode", () => {
  it("should validate and clean swipe codes correctly", () => {
    assertEquals(
      validateSwipeCode(["up", "down", "left", "right"], "test"),
      ["up", "down", "left", "right"],
    );
  });

  it("should trim and lowercase swipe codes", () => {
    assertEquals(
      validateSwipeCode([" UP ", "Down", " LEFT", "RIGHT "], "test"),
      ["up", "down", "left", "right"],
    );
  });

  it("should filter out empty strings", () => {
    assertEquals(
      validateSwipeCode(["up", "", "down", "  ", "left"], "test"),
      ["up", "down", "left"],
    );
  });

  it("should throw error for empty code array", () => {
    assertThrows(
      () => validateSwipeCode([], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain at least one non-empty character.",
    );
  });

  it("should throw error for invalid swipe directions", () => {
    assertThrows(
      () => validateSwipeCode(["invalid", "up"], "test"),
      Error,
      "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
    );
  });
});
