import { Color as ChromaColor } from 'chroma-js';
import { RandomFunction } from './Random';
export declare type Color = number;
export declare type ColorSet = Array<Color>;
export interface ColorGradientLinear {
    linear: true;
    direction: number;
}
export declare type ColorGradientSharedSize = 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
export interface ColorGradientRadialCircle {
    circle: true;
    circleSize: ColorGradientSharedSize | number;
}
export interface ColorGradientRadialEllipseCustomSize {
    horizonalRadius: number;
    verticalRadius: number;
}
export interface ColorGradientRadialEllipse {
    ellipse: true;
    ellipseSize: ColorGradientSharedSize | ColorGradientRadialEllipseCustomSize;
}
export interface ColorGradientRadial {
    radial: true;
    shape: ColorGradientRadialCircle | ColorGradientRadialEllipse;
    horizontalPosition: 'left' | 'center' | 'right' | number;
    verticalPosition: 'top' | 'center' | 'bottom' | number;
}
export interface ColorGradientColorStop {
    color: Color;
    location: number;
}
export interface ColorGradient {
    type: ColorGradientLinear | ColorGradientRadial;
    colorStops: Array<ColorGradientColorStop>;
}
export declare const BlackAndWhite: ColorSet;
export declare const colorTypeToHexString: (color: number) => string;
export declare const colorTypeWithAlphaToHexString: (color: number, alpha: number) => string;
export declare const colorHexStringToColorType: (color: string) => number;
export declare const colorGradientToCSS: (colorGradient: ColorGradient) => string;
export declare const colorSetToEvenColorGradient: (colorSet: number[]) => ColorGradient;
declare module 'chroma-js' {
    interface ChromaStatic {
        /**
         * Returns a random color.
         */
        random(randomFunction?: RandomFunction): ChromaColor;
    }
}
export declare const randomColor: (randomFunction?: RandomFunction | undefined) => number;
