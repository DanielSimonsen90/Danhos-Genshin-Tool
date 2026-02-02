

import BaseService from "@/services/BaseService";
import { ScoreColorProps } from "./types";

/**
 * Represents an RGB color as a tuple of three numbers.
 * [red, green, blue] where each value is 0-255.
 */
type RGB = [number, number, number];

export default abstract class BaseSearchService<TResult> extends BaseService<TResult> {
  /**
   * Returns a color interpolated between colorLow and colorHigh based on the current score.
   * The higher the score, the closer to colorHigh; the lower, the closer to colorLow.
   *
   * @param props - ScoreColorProps containing [min, current, max] and [colorLow, colorHigh]
   * @returns Hex color string representing the interpolated color.
   *
   * The interpolation parameter `progress` is 0 at min (colorLow), 1 at max (colorHigh).
   */
  public getScoreColor(props: ScoreColorProps): string {
    const { scores, colors } = props;
    const [min, current, max] = scores;
    const [colorLow, colorHigh] = colors;

    if (min === max) return colorHigh;

    // normalizedScore: 0 = min (colorLow), 1 = max (colorHigh)
    const normalizedScore = clamp((current - min) / (max - min), 0, 1);

    const rgbMin = hexToRgb(colorLow);
    const rgbMax = hexToRgb(colorHigh);
    const rgbInterpolated = interpolateRgb(rgbMax, rgbMin, normalizedScore);
    return rgbToHex(rgbInterpolated);
  }
}

// --- Color Utility Functions ---

/**
 * Converts a hex color string (e.g. "#ff0000" or "#f00") to an RGB tuple.
 */
function hexToRgb(hex: string): RGB {
  let hexString = hex.replace('#', '');
  if (hexString.length === 3) hexString = hexString[0] + hexString[0] + hexString[1] + hexString[1] + hexString[2] + hexString[2];
  const numericValue = parseInt(hexString, 16);
  return [
    (numericValue >> 16) & 255,
    (numericValue >> 8) & 255,
    numericValue & 255
  ];
}

/**
 * Converts an RGB tuple to a hex color string.
 */
function rgbToHex([red, green, blue]: RGB): string {
  return (
    '#' + [red, green, blue]
      .map(channel => channel.toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Clamps a number between min and max (inclusive).
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linearly interpolates between two numbers.
 */
function interpolateNumber(from: number, to: number, factor: number): number {
  return from + (to - from) * factor;
}

/**
 * Linearly interpolates between two RGB colors.
 */
function interpolateRgb(from: RGB, to: RGB, factor: number): RGB {
  return [
    Math.round(interpolateNumber(from[0], to[0], factor)),
    Math.round(interpolateNumber(from[1], to[1], factor)),
    Math.round(interpolateNumber(from[2], to[2], factor))
  ];
}