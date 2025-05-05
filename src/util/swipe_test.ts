import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { calculateSwipeDirection } from "@/util/swipe.ts";

describe("calculateSwipeDirection", () => {
  describe("Horizontal swipes", () => {
    it("should detect right swipe when horizontal distance is greater than vertical", () => {
      assertEquals(
        calculateSwipeDirection(0, 50, 0, 20),
        "right",
      );
    });
    it("should detect left swipe when horizontal distance is greater than vertical", () => {
      assertEquals(
        calculateSwipeDirection(50, 0, 0, 20),
        "left",
      );
    });
    it("should detect right swipe even with some vertical movement", () => {
      assertEquals(
        calculateSwipeDirection(0, 50, 0, 20),
        "right",
      );
    });
    it("should detect left swipe even with some vertical movement", () => {
      assertEquals(
        calculateSwipeDirection(50, 0, 0, 20),
        "left",
      );
    });
  });
  describe("Vertical swipes", () => {
    it("should detect down swipe when vertical distance is greater than horizontal", () => {
      assertEquals(
        calculateSwipeDirection(0, 10, 0, 50),
        "down",
      );
    });
    it("should detect up swipe when vertical distance is greater than horizontal", () => {
      assertEquals(
        calculateSwipeDirection(0, 10, 50, 0),
        "up",
      );
    });
    it("should detect down swipe even with some horizontal movement", () => {
      assertEquals(
        calculateSwipeDirection(0, 20, 0, 50),
        "down",
      );
    });
    it("should detect up swipe even with some horizontal movement", () => {
      assertEquals(
        calculateSwipeDirection(0, 20, 50, 0),
        "up",
      );
    });
  });
  describe("Threshold handling", () => {
    it("should return none when both distances are below threshold", () => {
      assertEquals(
        calculateSwipeDirection(0, 20, 0, 20),
        "none",
      );
    });
    it("should return none when horizontal distance is below threshold", () => {
      assertEquals(
        calculateSwipeDirection(0, 20, 0, 0),
        "none",
      );
    });
    it("should return none when vertical distance is below threshold", () => {
      assertEquals(
        calculateSwipeDirection(0, 0, 0, 20),
        "none",
      );
    });
    it("should detect direction when one distance is exactly at threshold", () => {
      assertEquals(
        calculateSwipeDirection(0, 30, 0, 0),
        "right",
      );
    });
  });
  describe("Edge cases", () => {
    it("should handle equal horizontal and vertical distances", () => {
      assertEquals(
        calculateSwipeDirection(0, 50, 0, 50),
        "none",
      );
    });
    it("should handle negative coordinates", () => {
      assertEquals(
        calculateSwipeDirection(-50, -100, 0, 0),
        "left",
      );
    });
    it("should handle large distances", () => {
      assertEquals(
        calculateSwipeDirection(0, 1000, 0, 100),
        "right",
      );
    });
    it("should handle zero movement", () => {
      assertEquals(
        calculateSwipeDirection(0, 0, 0, 0),
        "none",
      );
    });
  });
});
