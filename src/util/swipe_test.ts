import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { calculateSwipeDirection, type SwipePositions } from "@/util/swipe.ts";

describe("calculateSwipeDirection", () => {
  describe("Horizontal swipes", () => {
    it("should detect right swipe when horizontal distance is greater than vertical", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 50,
        startY: 0,
        endY: 20,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "right",
      );
    });
    it("should detect left swipe when horizontal distance is greater than vertical", () => {
      const swipePositions: SwipePositions = {
        startX: 50,
        endX: 0,
        startY: 0,
        endY: 20,
      };

      assertEquals(
        calculateSwipeDirection(swipePositions),
        "left",
      );
    });
    it("should detect right swipe even with some vertical movement", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 50,
        startY: 0,
        endY: 20,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "right",
      );
    });
    it("should detect left swipe even with some vertical movement", () => {
      const swipePositions: SwipePositions = {
        startX: 50,
        endX: 0,
        startY: 0,
        endY: 20,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "left",
      );
    });
  });
  describe("Vertical swipes", () => {
    it("should detect down swipe when vertical distance is greater than horizontal", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 10,
        startY: 0,
        endY: 50,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "down",
      );
    });
    it("should detect up swipe when vertical distance is greater than horizontal", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 10,
        startY: 50,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "up",
      );
    });
    it("should detect down swipe even with some horizontal movement", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 20,
        startY: 0,
        endY: 50,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "down",
      );
    });
    it("should detect up swipe even with some horizontal movement", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 20,
        startY: 50,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "up",
      );
    });
  });
  describe("Threshold handling", () => {
    it("should return none when both distances are below threshold", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 20,
        startY: 0,
        endY: 20,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "none",
      );
    });
    it("should return none when horizontal distance is below threshold", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 20,
        startY: 0,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "none",
      );
    });
    it("should return none when vertical distance is below threshold", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 20,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "none",
      );
    });
    it("should detect direction when one distance is exactly at threshold", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 30,
        startY: 0,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "right",
      );
    });
  });
  describe("Edge cases", () => {
    it("should handle equal horizontal and vertical distances", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 50,
        startY: 0,
        endY: 50,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "none",
      );
    });
    it("should handle negative coordinates", () => {
      const swipePositions: SwipePositions = {
        startX: -50,
        endX: -100,
        startY: 0,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "left",
      );
    });
    it("should handle large distances", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 1000,
        startY: 0,
        endY: 100,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "right",
      );
    });
    it("should handle zero movement", () => {
      const swipePositions: SwipePositions = {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
      };
      assertEquals(
        calculateSwipeDirection(swipePositions),
        "none",
      );
    });
  });
});
