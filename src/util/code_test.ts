import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { codeToChars, validateCode } from "@/util/code.ts";
import { HistoricalCodes } from "@/historical-codes.ts";

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
        codeToChars(["slash", "up", "down", "left", "right", "enter", "space", "ctrl", "alt", "tab", "esc"]),
        ["/", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Space", "Control", "Alt", "Tab", "Escape"],
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

describe("validateCode", () => {
  describe("Basic validation", () => {
    it("should validate a simple code correctly", () => {
      assertEquals(
        validateCode(["a", "b", "c"], "test"),
        ["a", "b", "c"],
      );
    });

    it("should validate a code with numbers correctly", () => {
      assertEquals(
        validateCode(["1", "2", "3"], "test"),
        ["1", "2", "3"],
      );
    });

    it("should validate a code with mixed alphanumeric characters correctly", () => {
      assertEquals(
        validateCode(["a", "1", "b", "2"], "test"),
        ["a", "1", "b", "2"],
      );
    });
  });

  describe("Input cleaning", () => {
    it("should trim whitespace from codes", () => {
      assertEquals(
        validateCode(["  a  ", "  b  ", "  c  "], "test"),
        ["a", "b", "c"],
      );
    });

    it("should convert codes to lowercase", () => {
      assertEquals(
        validateCode(["A", "B", "C"], "test"),
        ["a", "b", "c"],
      );
    });

    it("should remove empty strings", () => {
      assertEquals(
        validateCode(["a", "", "b", "  ", "c"], "test"),
        ["a", "b", "c"],
      );
    });
  });

  describe("Error handling", () => {
    it("should throw error for empty code array", () => {
      try {
        validateCode([], "test");
        throw new Error("Expected error was not thrown");
      } catch (error: unknown) {
        if (error instanceof Error) {
          assertEquals(
            error.message,
            "Error executing easter egg test: The code for the easter egg must contain at least one non-empty character.",
          );
        } else {
          throw new Error("Unexpected error type");
        }
      }
    });

    it("should throw error for code with only empty strings", () => {
      try {
        validateCode(["", "  ", "\t"], "test");
        throw new Error("Expected error was not thrown");
      } catch (error: unknown) {
        if (error instanceof Error) {
          assertEquals(
            error.message,
            "Error executing easter egg test: The code for the easter egg must contain at least one non-empty character.",
          );
        } else {
          throw new Error("Unexpected error type");
        }
      }
    });

    it("should throw error for code with invalid characters", () => {
      try {
        validateCode(["a", "!", "b"], "test");
        throw new Error("Expected error was not thrown");
      } catch (error: unknown) {
        if (error instanceof Error) {
          assertEquals(
            error.message,
            "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
          );
        } else {
          throw new Error("Unexpected error type");
        }
      }
    });

    it("should throw error for code with special keys", () => {
      try {
        validateCode(["a", "up", "b"], "test");
        throw new Error("Expected error was not thrown");
      } catch (error: unknown) {
        if (error instanceof Error) {
          assertEquals(
            error.message,
            "Error executing easter egg test: The code for the easter egg must contain only valid key codes.",
          );
        } else {
          throw new Error("Unexpected error type");
        }
      }
    });
  });
});
