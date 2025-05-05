/**
 * The minimum distance in pixels that a swipe must travel to be considered a valid swipe.
 */
const SWIPE_THRESHOLD = 30;
/**
 * Represents the possible directions of a swipe gesture.
 * @typedef {("up"|"down"|"right"|"left"|"none")} SwipeDirection
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
 * @param {number} startX - The X coordinate where the swipe started
 * @param {number} endX - The X coordinate where the swipe ended
 * @param {number} startY - The Y coordinate where the swipe started
 * @param {number} endY - The Y coordinate where the swipe ended
 * @returns {SwipeDirection} The direction of the swipe ("up", "down", "right", "left", or "none")
 *
 * @example
 * ```ts
 * // Returns "right" for a rightward swipe
 * calculateSwipeDirection(0, 50, 0, 0);
 *
 * // Returns "none" for a swipe that didn't travel far enough
 * calculateSwipeDirection(0, 20, 0, 0);
 * ```
 */
export function calculateSwipeDirection(
  startX: number,
  endX: number,
  startY: number,
  endY: number,
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
