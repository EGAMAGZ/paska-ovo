/**
 * Represents the coordinates of a swipe gesture.
 * Contains both the starting and ending positions of a touch event.
 *
 * @property {number} startX - The X coordinate where the swipe started
 * @property {number} startY - The Y coordinate where the swipe started
 * @property {number} endX - The X coordinate where the swipe ended
 * @property {number} endY - The Y coordinate where the swipe ended
 */
export type SwipePositions = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

/**
 * The minimum distance in pixels that a swipe must travel to be considered a valid swipe.
 */
const SWIPE_THRESHOLD = 30;
/**
 * Represents the possible directions of a swipe gesture.
 */
export type SwipeDirection =
  | "up"
  | "down"
  | "right"
  | "left"
  | "none";

/**
 * Calculates the direction of a swipe gesture based on start and end coordinates.
 *
 * @param {SwipePositions} swipePositions - The starting and ending positions from the swipe
 * @returns {SwipeDirection} The direction of the swipe ("up", "down", "right", "left", or "none")
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert"
 * let swipePositions = {
 * 	startX: 0,
 * 	endX: 50,
 * 	startY: 0,
 * 	endY: 0,
 * };
 * // Returns "right" for a rightward swipe
 * assertEquals(calculateSwipeDirection(swipePositions),"right");
 *
 * swipePositions = {
 * 	startX: 0,
 * 	endX: 20,
 * 	startY: 0,
 * 	endY: 0,
 * };
 *
 * // Returns "none" for a swipe that didn't travel far enough
 * assertEquals(calculateSwipeDirection(swipePositions),"none");
 * ```
 */
export function calculateSwipeDirection(
  { startX, endX, startY, endY }: SwipePositions,
): SwipeDirection {
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const absDistanceX = Math.abs(distanceX);
  const absDistanceY = Math.abs(distanceY);
  if (
    absDistanceX < SWIPE_THRESHOLD &&
    absDistanceY < SWIPE_THRESHOLD
  ) return "none";
  if (absDistanceX > absDistanceY) {
    return distanceX > 0 ? "right" : "left";
  } else if (absDistanceX < absDistanceY) {
    return distanceY > 0 ? "down" : "up";
  } else {
    return "none";
  }
}
